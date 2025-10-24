import { Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { ROICalculator } from '@/components/calculators/ROICalculator';
// import { AdUnit } from '@/components/AdUnit'; // Commented out for now
import { AdsterraAdUnit } from '@/components/AdsterraAdUnit';
import Link from 'next/link';

interface ROIPageProps {
  searchParams: Promise<{
    initial?: string;
    final?: string;
    years?: string;
  }>;
}

export default async function ROIPage({ searchParams }: ROIPageProps) {
  const params = await searchParams;
  const initialValues = {
    initialInvestment: params.initial ? parseFloat(params.initial) : 100000,
    finalValue: params.final ? parseFloat(params.final) : 150000,
    timePeriod: params.years ? parseFloat(params.years) : 5,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ROI Calculator",
    "description": "Calculate return on investment and annualized returns for your investments and business projects.",
    "url": "https://bizcalculator.com/roi-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "creator": {
      "@type": "Organization",
      "name": "BizCalculator"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SEO
        title="ROI Calculator - Calculate Return on Investment | BizCalculator"
        description="Free ROI calculator for investments and business projects. Calculate return on investment, annualized returns, and profit percentages with detailed analysis."
        canonical="https://bizcalculator.com/roi-calculator"
        keywords={[
          'roi calculator',
          'return on investment',
          'investment calculator',
          'profit calculator',
          'annualized return',
          'investment return'
        ]}
        structuredData={structuredData}
      />
      
      <Navigation />
      
      {/* Adsterra Ad after header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-center">
          <AdsterraAdUnit className="max-w-4xl w-full" />
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 mb-16">
          <Suspense fallback={
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="h-20 bg-slate-200 rounded"></div>
                <div className="h-20 bg-slate-200 rounded"></div>
                <div className="h-20 bg-slate-200 rounded"></div>
              </div>
            </div>
          }>
            <ROICalculator initialValues={initialValues} />
          </Suspense>
        </div>

        {/* Center ad - Commented out for now */}
        {/* <div className="mt-16 mb-16">
          <div className="flex justify-center">
            <AdUnit className="max-w-4xl w-full" />
          </div>
        </div> */}

        {/* SEO Content Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">Understanding Return on Investment (ROI)</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Return on Investment (ROI) is a crucial financial metric that measures the efficiency of an investment. 
              It compares the gain or loss from an investment relative to its cost, expressed as a percentage.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why ROI Matters for Your Business</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Investment Decision Making:</strong> ROI helps you compare different investment opportunities and choose the most profitable ones.</li>
              <li><strong>Performance Evaluation:</strong> Track the performance of your investments over time to ensure they meet your financial goals.</li>
              <li><strong>Resource Allocation:</strong> Make informed decisions about where to allocate your limited resources for maximum returns.</li>
              <li><strong>Risk Assessment:</strong> Higher ROI often comes with higher risk, so understanding this relationship is crucial for balanced decision-making.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Use Our ROI Calculator</h3>
            <p className="text-gray-600 mb-4">
              Our free ROI calculator makes it easy to calculate your investment returns:
            </p>
            <ol className="list-decimal list-inside text-gray-600 mb-6 space-y-2">
              <li>Enter your initial investment amount (the money you invested)</li>
              <li>Enter the final value of your investment (current value or sale price)</li>
              <li>Specify the time period in years</li>
              <li>Get instant calculations for ROI percentage and annualized returns</li>
            </ol>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">ROI Calculation Formula</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-lg font-mono text-gray-800">
                ROI = ((Final Value - Initial Investment) / Initial Investment) × 100
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Types of ROI Calculations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Simple ROI</h4>
                <p className="text-blue-800 text-sm">Basic percentage return on investment without considering time period.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Annualized ROI</h4>
                <p className="text-green-800 text-sm">ROI adjusted for the time period, showing yearly return rate.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">ROI Best Practices</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Consider both positive and negative ROI scenarios in your planning</li>
              <li>Compare ROI with industry benchmarks and market averages</li>
              <li>Factor in all costs, including fees, taxes, and opportunity costs</li>
              <li>Use ROI alongside other metrics like payback period and net present value</li>
              <li>Regularly review and update your ROI calculations as market conditions change</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">BizCalculator</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Professional business calculators for EMI, ROI, business valuation, and break-even analysis. 
                Built by tech enthusiasts to help you make informed financial decisions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">EMI Calculator</Link></li>
                <li><a href="/business-valuation" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">Business Valuation</a></li>
                <li><a href="/roi-calculator" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">ROI Calculator</a></li>
                <li><a href="/break-even-analysis" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">Break-Even Analysis</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">About Us</a></li>
                <li><a href="/contact" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 BizCalculator. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ by tech enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
