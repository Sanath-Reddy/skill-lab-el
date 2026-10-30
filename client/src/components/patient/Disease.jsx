import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageMeta from '../common/PageMeta';

const predefinedSymptoms = [
  "fever", "cough", "headache", "nausea", "fatigue",
  "sore throat", "vomiting", "diarrhea", "rash", "chills",
  "joint pain", "muscle pain", "loss of taste", "loss of smell",
  "shortness of breath", "dizziness", "chest pain", "abdominal pain",
  "sneezing", "runny nose", "blurred vision", "weight loss",
  "insomnia", "itching", "swollen glands", "constipation", "dry mouth",
  "difficulty swallowing", "skin irritation", "palpitations"
];

function Disease() {
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const inputRef = useRef(null);

  useEffect(() => {
    const filtered = predefinedSymptoms.filter(
      (symptom) =>
        symptom.toLowerCase().startsWith(symptomInput.toLowerCase()) &&
        !selectedSymptoms.includes(symptom)
    );
    setSuggestions(symptomInput ? filtered : []);
    setHighlightIndex(-1);
  }, [symptomInput, selectedSymptoms]);

  const handleInputChange = (e) => setSymptomInput(e.target.value);

  const handleSuggestionClick = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSymptomInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0) {
        handleSuggestionClick(suggestions[highlightIndex]);
      } else if (symptomInput.trim() !== '' && !selectedSymptoms.includes(symptomInput.trim())) {
        setSelectedSymptoms([...selectedSymptoms, symptomInput.trim()]);
        setSymptomInput('');
      }
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      toast.warn("Please add at least one symptom.");
      return;
    }

    try {
      const response = await fetch('https://raktconnect-ai-backend.onrender.com/predict/disease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await response.json();
      setPrediction(data.predicted_disease);
      toast.success('Disease analysis completed.');
    } catch (error) {
      console.error('Error predicting disease:', error);
      toast.error('Failed to predict disease. Please try again.');
    }
  };

  return (
    <>
      <PageMeta title="Disease Checker | RaktConnect" />

      <div className="min-h-screen py-10 px-4 bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded border border-gray-300 w-full max-w-xl shadow-sm">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h1 className="text-lg font-bold text-gray-900">
              Symptom-based Disease Checker
            </h1>
            <p className="text-xs text-gray-500">
              Select current symptoms to run machine-learning diagnostic assessment
            </p>
          </div>

          {/* Selected tags */}
          <div className="min-h-[40px] p-2 bg-gray-50 border border-gray-200 rounded mb-3 flex flex-wrap gap-1.5 items-center">
            {selectedSymptoms.length === 0 ? (
              <span className="text-xs text-gray-400">No symptoms selected yet. Type below to add.</span>
            ) : (
              selectedSymptoms.map((symptom, idx) => (
                <span
                  key={idx}
                  className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1"
                >
                  {symptom}
                  <button
                    className="text-red-500 hover:text-red-800 font-bold"
                    onClick={() => removeSymptom(symptom)}
                    title="Remove symptom"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Input Field */}
          <div className="relative w-full mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Add Symptom (type and hit Enter or click a suggestion):
            </label>
            <input
              type="text"
              ref={inputRef}
              value={symptomInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g. fever, headache, cough..."
              className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-600"
            />

            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-48 overflow-y-auto z-20">
                {suggestions.map((symptom, index) => (
                  <li
                    key={index}
                    className={`px-3 py-1.5 text-xs cursor-pointer ${
                      highlightIndex === index ? 'bg-red-50 text-red-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSuggestionClick(symptom)}
                  >
                    {symptom}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={handlePredict}
            className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors"
          >
            Run Diagnostic Check
          </button>

          {prediction && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800">
              <span className="font-semibold">Predicted Condition: </span>
              <strong className="text-red-900 text-sm">{prediction}</strong>
              <p className="text-[11px] text-gray-600 mt-1">
                Note: This is an academic prediction tool and does not substitute professional medical diagnosis.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Disease;
