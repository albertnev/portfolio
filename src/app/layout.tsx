import type { Metadata } from "next";

import { inter } from "@/fonts/Inter";
import "./globals.css";

export const metadata: Metadata = {
  description:
    "A senior frontend developer's portfolio. If you're hiring, take a look and contact me!",
  title: "Albert Nevado - Portfolio",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${inter.className} h-screen w-full antialiased leading-relaxed text-slate-300 font-light selection:bg-cyan-700`}
      >
        <div className="fixed z-0 top-0 left-0 h-screen w-screen animate-gradient-x background-gradient" />
        <div className="relative z-10 px-8 max-w-screen-xl min-h-screen mx-auto pb-24 sm:px-24 md:p-12 md:py-0 md:flex md:justify-between lg:p-24 lg:py-0 md:gap-8">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
