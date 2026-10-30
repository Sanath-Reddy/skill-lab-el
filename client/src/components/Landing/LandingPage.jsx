import React from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import PageMeta from "../common/PageMeta";

const LandingPage = () => {
  return (
    <>
      <PageMeta title="Home | RaktConnect" />

      <div>
        <HeroSection />
        <Features />
        <HowItWorks />
      </div>
    </>
  );
};

export default LandingPage;
