import { useEffect } from "react";

export const useHashScroll = () => {
  useEffect(() => {
    const scrollToHash = (newHash: string) => {
      document
        .getElementById(newHash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (window.location.hash) {
      scrollToHash(window.location.hash); // Initial hash scroll on load
    }
  }, []);
};
