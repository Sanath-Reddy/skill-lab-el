import { useState } from "react";
import { useLocation } from "react-router-dom";
import PageMeta from "../common/PageMeta";

const CompleteProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "user";

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    medicalCondition: "",
    licenseNumber: "",
    state: "",
    district: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted Data:", { role, ...formData });
  };

  const Input = ({ label, name, type = "text", required }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
      />
    </div>
  );

  return (
    <>
      <PageMeta title="Complete Profile | RaktConnect" />

      <div className="min-h-screen py-12 px-4 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded border border-gray-300 shadow-sm">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-1">
            Complete {role.charAt(0).toUpperCase() + role.slice(1)} Profile
          </h2>
          <p className="text-xs text-gray-500 text-center mb-6">
            Please fill in your basic account details
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <Input label="Full Name / Org Name" name="name" required />
            <Input label="Contact Number" name="contact" required />

            {role !== "hospital" && (
              <Input label="Age" name="age" type="number" required />
            )}

            {role === "patient" && (
              <Input label="Medical Notes (Optional)" name="medicalCondition" />
            )}

            {role === "hospital" && (
              <>
                <Input label="Hospital License Number" name="licenseNumber" required />
                <Input label="State" name="state" required />
                <Input label="District" name="district" required />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-red-700 mt-4"
            >
              Save Profile
            </button>
          </form>

          {submitted && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 text-xs text-center rounded">
              Profile details submitted successfully!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
