import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahammad Hussain | SDE & Machine Learning Engineer • 22nd-Century 3D Portfolio",
  description: "Interactive Doraemon-themed 3D engineering portfolio of Mahammad Hussain. SDE Intern at CoinDCX (Backend), ex-Flipkart ML Intern, IIIT Lucknow CS graduate building resilient distributed systems and predictive models.",
  keywords: [
    "Mahammad Hussain",
    "Software Development Engineer",
    "CoinDCX Intern",
    "Flipkart Intern",
    "Machine Learning Engineer",
    "IIIT Lucknow",
    "Go Backend",
    "Python XGBoost",
    "3D Portfolio",
    "Doraemon Portfolio"
  ],
  authors: [{ name: "Mahammad Hussain" }],
  openGraph: {
    title: "Mahammad Hussain | SDE & Machine Learning Engineer",
    description: "Explore the 22nd-century interactive 3D portfolio featuring scalable systems, machine learning models, and production web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahammad Hussain | SDE & Machine Learning Engineer Portfolio",
    description: "22nd-Century 3D Engineering Portfolio of Mahammad Hussain.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070f2b] text-white selection:bg-sky-500/30 selection:text-sky-200">
        {children}
      </body>
    </html>
  );
}
