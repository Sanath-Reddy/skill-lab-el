import React from "react";
import { UserPlus, Heart, Truck } from "lucide-react";
import PageMeta from "../common/PageMeta";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "1",
      title: "Step 1: Sign Up",
      text: "Create your profile as a donor, healthcare provider, or patient in minutes.",
    },
    {
      icon: Heart,
      step: "2",
      title: "Step 2: Request or Donate",
      text: "Hospitals post needs, donors schedule donations, and blood requirements are matched.",
    },
    {
      icon: Truck,
      step: "3",
      title: "Step 3: Save a Life",
      text: "Logistics ensure timely delivery of blood to patients where it is needed most.",
    },
  ];

  return (
    <>
      <PageMeta title="RaktConnect" />

      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              How It Works
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              A simple three-step process to connect blood donors and recipients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded border border-gray-200 relative flex flex-col items-center text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded bg-gray-100 text-red-600 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
