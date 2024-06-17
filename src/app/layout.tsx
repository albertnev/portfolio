import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

export const inter = Inter({ subsets: ["latin"] });

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
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
