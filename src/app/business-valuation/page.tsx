import { Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { BusinessValuationCalculator } from '@/components/calculators/BusinessValuationCalculator';
import Link from 'next/link';

interface BusinessValuationPageProps {
  searchParams: Promise<{
    revenue?: string;
    profitMargin?: string;
    growthRate?: string;
    discountRate?: string;
  }>;
}

export default async function BusinessValuationPage({ searchParams }: BusinessValuationPageProps) {
  const params = await searchParams;
  const initialValues = {
    revenue: params.revenue ? parseFloat(params.revenue) : 1000000,
    profitMargin: params.profitMargin ? parseFloat(params.profitMargin) : 15,
    growthRate: params.growthRate ? parseFloat(params.growthRate) : 10,
    discountRate: params.discountRate ? parseFloat(params.discountRate) : 12,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Business Valuation Calculator",
    "description": "Estimate your business value using revenue multiples, profit margins, and growth projections.",
    "url": "https://bizcalculator.com/business-valuation",
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
        title="Business Valuation Calculator - Estimate Company Value | BizCalculator"
        description="Free business valuation calculator using revenue multiples and growth projections. Estimate your company's worth with professional valuation methods."
        canonical="https://bizcalculator.com/business-valuation"
        keywords={[
          'business valuation',
          'company valuation',
          'business worth',
          'valuation calculator',
          'revenue multiple',
          'profit multiple',
          'business appraisal'
        ]}
        structuredData={structuredData}
      />
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 mb-16">
          <Suspense fallback={
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="h-20 bg-slate-200 rounded"></div>
                <div className="h-20 bg-slate-200 rounded"></div>
              </div>
            </div>
          }>
            <BusinessValuationCalculator initialValues={initialValues} />
          </Suspense>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">Understanding Business Valuation</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Business valuation is the process of determining the economic value of a business or company. 
              It&apos;s essential for various purposes including selling a business, raising capital, mergers and acquisitions, 
              and strategic planning. Our calculator uses industry-standard methods to provide accurate estimates.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Business Valuation Matters</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Sale Preparation:</strong> Know your business worth before putting it on the market</li>
              <li><strong>Investment Decisions:</strong> Attract investors with professional valuation reports</li>
              <li><strong>Strategic Planning:</strong> Make informed decisions about growth and expansion</li>
              <li><strong>Tax Planning:</strong> Understand valuation for estate planning and tax purposes</li>
              <li><strong>Partnership Agreements:</strong> Fairly distribute ownership and profits among partners</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Valuation Methods Used</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Revenue Multiple Method</h4>
                <p className="text-blue-800 text-sm">Values business based on annual revenue multiplied by industry-specific multiples.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Profit Multiple Method</h4>
                <p className="text-green-800 text-sm">Uses net profit or EBITDA multiplied by industry multiples for valuation.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Asset-Based Valuation</h4>
                <p className="text-purple-800 text-sm">Calculates value based on company&apos;s tangible and intangible assets.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Market Comparison</h4>
                <p className="text-orange-800 text-sm">Compares with similar businesses in the same industry and market.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Factors Affecting Business Value</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Financial Performance:</strong> Revenue growth, profitability, and cash flow stability</li>
              <li><strong>Market Position:</strong> Competitive advantage, market share, and brand strength</li>
              <li><strong>Industry Trends:</strong> Growth prospects and market conditions in your sector</li>
              <li><strong>Management Quality:</strong> Leadership team experience and operational efficiency</li>
              <li><strong>Customer Base:</strong> Customer diversity, loyalty, and recurring revenue</li>
              <li><strong>Technology & Assets:</strong> Intellectual property, technology stack, and physical assets</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Industry-Specific Multiples</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Industry</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Revenue Multiple</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Profit Multiple</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Technology</td>
                    <td className="px-4 py-2 text-sm text-gray-900">3-8x</td>
                    <td className="px-4 py-2 text-sm text-gray-900">8-25x</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Manufacturing</td>
                    <td className="px-4 py-2 text-sm text-gray-900">1-3x</td>
                    <td className="px-4 py-2 text-sm text-gray-900">4-8x</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Retail</td>
                    <td className="px-4 py-2 text-sm text-gray-900">0.5-2x</td>
                    <td className="px-4 py-2 text-sm text-gray-900">3-6x</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Services</td>
                    <td className="px-4 py-2 text-sm text-gray-900">1-4x</td>
                    <td className="px-4 py-2 text-sm text-gray-900">4-12x</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Valuation Best Practices</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Use multiple valuation methods for more accurate results</li>
              <li>Consider both quantitative and qualitative factors</li>
              <li>Get professional valuation for important transactions</li>
              <li>Regularly update valuations as business conditions change</li>
              <li>Document all assumptions and methodologies used</li>
              <li>Consider market conditions and economic factors</li>
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
