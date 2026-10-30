import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow border border-red-700"
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
