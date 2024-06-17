"use client";

import { useHashScroll } from "@/hooks/useHashScroll";

const HashScroll: React.FC = () => {
  // Use this hook here so Server Components can use it and still be SC
  useHashScroll();
  return null;
};

export default HashScroll;
