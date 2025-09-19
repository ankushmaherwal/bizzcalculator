import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConsentWrapper } from "@/components/ConsentWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BizCalculator - Professional Business Calculators",
  description: "Professional business calculators for EMI, ROI, business valuation, and break-even analysis. Free online financial tools for entrepreneurs and businesses.",
  keywords: ["business calculator", "emi calculator", "roi calculator", "business valuation", "break even analysis"],
  authors: [{ name: "BizCalculator" }],
  creator: "BizCalculator",
  publisher: "BizCalculator",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bizcalculator.com",
    siteName: "BizCalculator",
    title: "BizCalculator - Professional Business Calculators",
    description: "Professional business calculators for EMI, ROI, business valuation, and break-even analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizCalculator - Professional Business Calculators",
    description: "Professional business calculators for EMI, ROI, business valuation, and break-even analysis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50">
        <ConsentWrapper>
          {children}
        </ConsentWrapper>
      </body>
    </html>
  );
}
