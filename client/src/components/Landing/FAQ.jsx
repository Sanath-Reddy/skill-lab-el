import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../common/PageMeta';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('donors');
  const navigate = useNavigate();

  const faqCategories = {
    donors: {
      title: "For Donors",
      faqs: [
        {
          question: "Eligibility Criteria",
          answer: "",
          isCategory: true
        },
        {
          question: "Can I donate if I have a tattoo or piercing?",
          answer: "Yes, you can donate if the tattoo or piercing was done using sterile needles and has healed fully, typically after 6 months."
        },
        {
          question: "Can people with diabetes donate blood?",
          answer: "Yes, if your diabetes is well controlled and you are otherwise healthy."
        },
        {
          question: "Can I donate if I'm on medication?",
          answer: "It depends on the medication. Consult with the donation center for a complete list of restricted drugs."
        },
        {
          question: "Donation Frequency",
          answer: "",
          isCategory: true
        },
        {
          question: "How often can I donate whole blood?",
          answer: "Every 56 days (8 weeks)."
        },
        {
          question: "How often can I donate platelets or plasma?",
          answer: "Platelets: Every 7 days, up to 24 times a year. Plasma: Every 28 days."
        },
        {
          question: "During & After Donation",
          answer: "",
          isCategory: true
        },
        {
          question: "How long does the blood donation process take?",
          answer: "The entire process takes about 30 to 45 minutes, with the actual blood drawing taking 8–10 minutes."
        },
        {
          question: "What should I do after donating blood?",
          answer: "Rest for 10-15 minutes, drink plenty of fluids, and avoid heavy lifting or intense physical activity for the rest of the day."
        }
      ]
    },
    patients: {
      title: "For Patients",
      faqs: [
        {
          question: "How can I request blood?",
          answer: "You can create a blood request on the portal with your hospital prescription and patient details."
        },
        {
          question: "What information do I need to provide?",
          answer: "Blood group needed, units required, hospital address, contact number, and doctor recommendation."
        },
        {
          question: "How long does it take to find a donor?",
          answer: "Emergency cases are highlighted immediately to matching registered donors in the area."
        }
      ]
    },
    hospitals: {
      title: "For Hospitals",
      faqs: [
        {
          question: "How can a hospital register?",
          answer: "Hospitals register through the portal with official credentials and license verification."
        },
        {
          question: "How is blood inventory managed?",
          answer: "Hospitals can update their available units per blood type and raise urgent replenishment alerts."
        }
      ]
    },
    organizers: {
      title: "For Organizers",
      faqs: [
        {
          question: "How do I organize a blood drive?",
          answer: "Reach out via our contact page to coordinate with partner blood banks for equipment and medical staff."
        },
        {
          question: "Is there any cost for organizing a camp?",
          answer: "Blood donation camps conducted with recognized government/charitable blood banks are free of charge."
        }
      ]
    }
  };

  return (
    <>
      <PageMeta title="FAQ | RaktConnect" />

      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Find answers to common questions about donation, requests, and procedures
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(faqCategories).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveIndex(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded border ${
                  activeCategory === category
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {faqCategories[category].title}
              </button>
            ))}
          </div>

          {/* FAQs List */}
          <div className="space-y-2">
            {faqCategories[activeCategory].faqs.map((faq, index) => {
              if (faq.isCategory) {
                return (
                  <div key={index} className="pt-4 pb-1 text-xs font-bold text-red-700 uppercase tracking-wider">
                    {faq.question}
                  </div>
                );
              }

              const isOpen = activeIndex === index;
              return (
                <div key={index} className="border border-gray-200 rounded">
                  <button
                    className="w-full p-3 text-left flex justify-between items-center text-sm font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="text-gray-500 ml-2">
                      {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-3 pt-0 text-xs sm:text-sm text-gray-600 border-t border-gray-100 bg-gray-50 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Support Box */}
          <div className="mt-10 p-5 bg-gray-50 border border-gray-200 rounded text-center">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">
              Didn't find your answer?
            </h2>
            <p className="text-xs text-gray-600 mb-3">
              Reach out to our coordinator team for any specific queries.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
