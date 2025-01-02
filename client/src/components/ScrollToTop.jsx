import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`z-50 fixed bottom-16 right-32 bg-[#27b3e2] text-white p-[10px] rounded-full shadow-lg hover:bg-[#27b3e2b6] transition-all duration-500 ease-in-out focus:outline-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      aria-label="Scroll to top"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
