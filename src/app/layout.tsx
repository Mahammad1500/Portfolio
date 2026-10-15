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
  title: "Mahammad Hussain | Software Development Engineer (SDE) • 3D Doraemon Portfolio",
  description: "Doraemon-themed 3D engineering portfolio of Mahammad Hussain, Software Development Engineer. SDE Intern at CoinDCX (Backend), IIIT Lucknow CS graduate building scalable backend distributed systems.",
  keywords: [
    "Mahammad Hussain",
    "Software Development Engineer",
    "SDE",
    "Backend SDE",
    "CoinDCX SDE",
    "Flipkart SDE",
    "IIIT Lucknow",
    "Go Backend",
    "3D Doraemon Portfolio"
  ],
  authors: [{ name: "Mahammad Hussain" }],
  openGraph: {
    title: "Mahammad Hussain | Software Development Engineer (SDE)",
    description: "Explore the Doraemon-themed 3D engineering portfolio featuring scalable systems and full-stack software applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahammad Hussain | Software Development Engineer Portfolio",
    description: "3D Doraemon-Themed Engineering Portfolio of Mahammad Hussain.",
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f0f9ff] text-slate-900 selection:bg-sky-400/30 selection:text-sky-900">
        {children}
      </body>
    </html>
  );
}
