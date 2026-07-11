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
  title: "Mahammad Hussain | SDE & Machine Learning Engineer Portfolio",
  description: "Explore the premium SDE, ML, and AI engineer portfolio of Mahammad Hussain. Featuring experience at Flipkart, competitive programming metrics, and advanced web applications.",
  keywords: ["Mahammad Hussain", "SDE", "Machine Learning", "AI Engineer", "Software Engineer Portfolio", "IIIT Lucknow", "Flipkart Intern"],
  authors: [{ name: "Mahammad Hussain" }],
  openGraph: {
    title: "Mahammad Hussain | SDE & Machine Learning Engineer",
    description: "Premium engineering portfolio detailing scalable system designs, machine learning inference microservices, and interactive web tools.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahammad Hussain | SDE & Machine Learning Engineer Portfolio",
    description: "Personal engineering portfolio of Mahammad Hussain.",
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
      <body className="min-h-full flex flex-col bg-[#020617] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
