import { Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { EMICalculator } from '@/components/calculators/EMICalculator';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BarChart3, TrendingUp, ArrowRight } from 'lucide-react';
import { CALCULATOR_PAGES } from '@/constants/seo';

interface HomePageProps {
  searchParams: Promise<{
    loan?: string;
    rate?: string;
    years?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const initialValues = {
    principal: params.loan ? parseFloat(params.loan) : 1000000,
    rate: params.rate ? parseFloat(params.rate) : 8.5,
    years: params.years ? parseFloat(params.years) : 20,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "EMI Loan Calculator - BizCalculator",
    "description": "Calculate your monthly EMI payments for home loans, personal loans, and business loans with detailed amortization schedule.",
    "url": "https://bizcalculator.com",
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
        title="EMI Loan Calculator - Calculate Monthly Payments | BizCalculator"
        description="Free EMI calculator for home loans, personal loans, and business loans. Calculate monthly EMI payments with detailed amortization schedule and interactive charts."
        canonical="https://bizcalculator.com"
        keywords={[
          'emi calculator',
          'loan calculator',
          'home loan calculator',
          'personal loan calculator',
          'business loan calculator',
          'amortization schedule',
          'monthly payment calculator'
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
            <EMICalculator initialValues={initialValues} />
          </Suspense>
        </div>

        {/* Other Calculators Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-12">
            More Business Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {CALCULATOR_PAGES.filter(page => page.path !== '/').map((calculator, index) => {
              const icons = [BarChart3, TrendingUp, BarChart3];
              const Icon = icons[index];
              
              return (
                <div key={calculator.path} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{calculator.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">{calculator.description}</p>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href={calculator.path}>
                      Calculate Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">Understanding EMI (Equated Monthly Installment)</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. 
              EMIs are used to pay off both interest and principal each month, so that over a specified number of years, the loan is fully paid off along with interest.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Use Our EMI Calculator?</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Accurate Planning:</strong> Know exactly how much you need to pay each month before taking a loan</li>
              <li><strong>Budget Management:</strong> Plan your monthly budget effectively by understanding your EMI obligations</li>
              <li><strong>Loan Comparison:</strong> Compare different loan offers and choose the most suitable one</li>
              <li><strong>Amortization Schedule:</strong> See how much of your payment goes towards principal vs interest</li>
              <li><strong>Prepayment Planning:</strong> Understand the impact of making extra payments on your loan</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Types of Loans You Can Calculate</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Home Loans</h4>
                <p className="text-blue-800 text-sm">Calculate EMI for home purchases, construction, and home improvement loans with competitive interest rates.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Personal Loans</h4>
                <p className="text-green-800 text-sm">Plan your personal loan EMI for various purposes like medical emergencies, education, or debt consolidation.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Business Loans</h4>
                <p className="text-purple-800 text-sm">Calculate EMI for business expansion, working capital, equipment purchase, and other business needs.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Vehicle Loans</h4>
                <p className="text-orange-800 text-sm">Plan your car loan or two-wheeler loan EMI with flexible tenure options.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">EMI Calculation Formula</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-lg font-mono text-gray-800">
                EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Where: P = Principal amount, r = Monthly interest rate, n = Number of months
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Factors Affecting EMI</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Principal Amount:</strong> The higher the loan amount, the higher the EMI</li>
              <li><strong>Interest Rate:</strong> Lower interest rates result in lower EMIs</li>
              <li><strong>Loan Tenure:</strong> Longer tenure means lower EMI but higher total interest</li>
              <li><strong>Processing Fees:</strong> One-time charges that may be added to the principal</li>
              <li><strong>Prepayment Charges:</strong> Additional costs for early loan closure</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">EMI Planning Tips</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Keep your EMI to income ratio below 40% for comfortable repayment</li>
              <li>Consider prepayment options to reduce total interest burden</li>
              <li>Choose flexible EMI options like step-up or step-down EMIs if available</li>
              <li>Factor in other financial obligations before finalizing loan amount</li>
              <li>Use our calculator to experiment with different loan amounts and tenures</li>
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