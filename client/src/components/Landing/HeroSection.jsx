import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PageMeta from "../common/PageMeta";

const HeroSection = ({ onVideoLoaded }) => {
  useEffect(() => {
    if (onVideoLoaded) {
      onVideoLoaded();
    }
  }, [onVideoLoaded]);

  return (
    <>
      <PageMeta title="HeroSection | RaktConnect" />

      <section className="bg-slate-50 border-b border-gray-200 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Blood Donation Network
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Save Lives, One Donation at a Time
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Bridging the gap between compassionate donors and life-saving needs.
            Join our network to make blood availability instant and effortless.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2.5 rounded font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
