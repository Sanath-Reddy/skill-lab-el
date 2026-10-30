import React from "react";
import { Heart, Building2, Users } from "lucide-react";
import PageMeta from "../common/PageMeta";

const Features = () => {
  const features = [
    {
      icon: Heart,
      title: "Easy Blood Donations",
      text: "Find the nearest donation center and schedule a donation in minutes.",
    },
    {
      icon: Building2,
      title: "Hospital Support",
      text: "Real-time blood inventory tracking and shortage forecasting.",
    },
    {
      icon: Users,
      title: "Community Impact",
      text: "Join a lifesaving network where every donation creates ripples of hope.",
    },
  ];

  return (
    <>
      <PageMeta title="Features | RaktConnect" />

      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Why Choose RaktConnect?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Key capabilities of our blood donation and management system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded border border-gray-200 hover:border-red-400 transition-colors"
                >
                  <div className="w-12 h-12 rounded bg-red-50 text-red-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.text}
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

export default Features;
