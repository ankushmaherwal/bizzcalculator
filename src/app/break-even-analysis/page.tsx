import { Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { BreakEvenCalculator } from '@/components/calculators/BreakEvenCalculator';
import Link from 'next/link';

interface BreakEvenPageProps {
  searchParams: Promise<{
    fixedCosts?: string;
    variableCosts?: string;
    sellingPrice?: string;
  }>;
}

export default async function BreakEvenPage({ searchParams }: BreakEvenPageProps) {
  const params = await searchParams;
  const initialValues = {
    fixedCosts: params.fixedCosts ? parseFloat(params.fixedCosts) : 50000,
    variableCosts: params.variableCosts ? parseFloat(params.variableCosts) : 100,
    sellingPrice: params.sellingPrice ? parseFloat(params.sellingPrice) : 200,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Break-Even Analysis Calculator",
    "description": "Determine your break-even point for products and services with fixed and variable cost analysis.",
    "url": "https://bizcalculator.com/break-even-analysis",
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
        title="Break-Even Analysis Calculator - Find Break-Even Point | BizCalculator"
        description="Free break-even analysis calculator to determine your break-even point for products and services. Analyze fixed and variable costs for better business decisions."
        canonical="https://bizcalculator.com/break-even-analysis"
        keywords={[
          'break even calculator',
          'break even analysis',
          'cost analysis',
          'profitability analysis',
          'fixed costs',
          'variable costs',
          'contribution margin'
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="h-20 bg-slate-200 rounded"></div>
                <div className="h-20 bg-slate-200 rounded"></div>
                <div className="h-20 bg-slate-200 rounded"></div>
              </div>
            </div>
          }>
            <BreakEvenCalculator initialValues={initialValues} />
          </Suspense>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">Understanding Break-Even Analysis</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Break-even analysis is a critical financial tool that helps businesses determine the point at which 
              total revenue equals total costs, resulting in neither profit nor loss. This analysis is essential 
              for pricing strategies, cost management, and business planning.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Break-Even Analysis is Important</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Pricing Strategy:</strong> Set optimal prices that cover all costs and generate profit</li>
              <li><strong>Cost Control:</strong> Identify and manage fixed and variable costs effectively</li>
              <li><strong>Sales Planning:</strong> Determine minimum sales targets to achieve profitability</li>
              <li><strong>Investment Decisions:</strong> Evaluate the viability of new products or services</li>
              <li><strong>Risk Assessment:</strong> Understand the financial risks and safety margins</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Components of Break-Even Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Fixed Costs</h4>
                <p className="text-blue-800 text-sm">Costs that remain constant regardless of production volume (rent, salaries, insurance).</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Variable Costs</h4>
                <p className="text-green-800 text-sm">Costs that change with production volume (materials, labor, utilities).</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Selling Price</h4>
                <p className="text-purple-800 text-sm">The price at which you sell your product or service to customers.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Contribution Margin</h4>
                <p className="text-orange-800 text-sm">The amount each unit contributes to covering fixed costs and profit.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Break-Even Formula</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-lg font-mono text-gray-800">
                Break-Even Point (Units) = Fixed Costs / (Selling Price - Variable Cost per Unit)
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Break-Even Point (Revenue) = Break-Even Units × Selling Price
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Types of Break-Even Analysis</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Single Product Analysis:</strong> Calculate break-even for one product or service</li>
              <li><strong>Multi-Product Analysis:</strong> Analyze break-even for multiple products with different margins</li>
              <li><strong>Time-Based Analysis:</strong> Consider break-even over different time periods</li>
              <li><strong>Scenario Analysis:</strong> Test different scenarios with varying costs and prices</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Benefits of Using Our Calculator</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Instant calculations with real-time updates</li>
              <li>Visual charts to understand the relationship between costs and revenue</li>
              <li>Multiple scenario testing for better decision making</li>
              <li>Export results for presentations and reports</li>
              <li>Mobile-friendly interface for on-the-go analysis</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Break-Even Analysis Best Practices</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Regularly update your analysis as costs and prices change</li>
              <li>Consider seasonal variations in sales and costs</li>
              <li>Factor in different customer segments and pricing tiers</li>
              <li>Include all relevant costs, including hidden or indirect costs</li>
              <li>Use sensitivity analysis to test different scenarios</li>
              <li>Monitor your actual performance against break-even projections</li>
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
