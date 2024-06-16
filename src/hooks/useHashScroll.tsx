import { useEffect } from "react";

export const useHashScroll = () => {
  useEffect(() => {
    const onHashChanged = (newHash: string) => {
      document
        .getElementById(newHash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (window.location.hash) {
      onHashChanged(window.location.hash); // Initial hash scroll on load
    }
  }, []);
};
