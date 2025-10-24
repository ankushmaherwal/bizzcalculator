import { Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { GratuityCalculator } from '@/components/calculators/GratuityCalculator';
// import { AdUnit } from '@/components/AdUnit'; // Commented out for now
import { AdsterraAdUnit } from '@/components/AdsterraAdUnit';
import Link from 'next/link';

interface GratuityCalculatorPageProps {
  searchParams: Promise<{
    basicSalary?: string;
    da?: string;
    yearsOfService?: string;
    lastDrawnSalary?: string;
  }>;
}

export default async function GratuityCalculatorPage({ searchParams }: GratuityCalculatorPageProps) {
  const params = await searchParams;
  const initialValues = {
    basicSalary: params.basicSalary ? parseFloat(params.basicSalary) : 50000,
    da: params.da ? parseFloat(params.da) : 10000,
    yearsOfService: params.yearsOfService ? parseFloat(params.yearsOfService) : 5,
    lastDrawnSalary: params.lastDrawnSalary ? parseFloat(params.lastDrawnSalary) : 60000,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Gratuity Calculator - Calculate Employee Gratuity | BizCalculator",
    "description": "Free gratuity calculator for employees. Calculate gratuity amount based on salary and years of service as per Indian labor laws.",
    "url": "https://bizcalculator.com/gratuity-calculator",
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
        title="Gratuity Calculator - Calculate Employee Gratuity | BizCalculator"
        description="Free gratuity calculator for employees. Calculate gratuity amount based on salary and years of service as per Indian labor laws with detailed breakdown."
        canonical="https://bizcalculator.com/gratuity-calculator"
        keywords={[
          'gratuity calculator',
          'employee gratuity',
          'gratuity calculation',
          'gratuity amount',
          'gratuity formula',
          'employee benefits',
          'labor law calculator',
          'retirement benefits'
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="h-20 bg-slate-200 rounded"></div>
                <div className="h-20 bg-slate-200 rounded"></div>
              </div>
            </div>
          }>
            <GratuityCalculator initialValues={initialValues} />
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">Understanding Gratuity</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Gratuity is a retirement benefit provided to employees who have completed at least 5 years of continuous service with an organization. 
              It&apos;s a statutory benefit under the Payment of Gratuity Act, 1972, and is calculated based on the employee&apos;s last drawn salary and years of service.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility for Gratuity</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Minimum Service:</strong> Employee must have completed at least 5 years of continuous service</li>
              <li><strong>Retirement:</strong> Upon superannuation (retirement at the age of 58-60 years)</li>
              <li><strong>Resignation:</strong> After completing 5 years of service</li>
              <li><strong>Death or Disability:</strong> Even if service is less than 5 years</li>
              <li><strong>Termination:</strong> Due to retrenchment, layoff, or voluntary retirement</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Gratuity Calculation Formula</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-lg font-mono text-gray-800">
                Gratuity = (Basic Salary + Dearness Allowance) / 26 × Years of Service
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Where 26 represents the number of working days in a month
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Basic Salary</h4>
                <p className="text-blue-800 text-sm">The basic salary component of your monthly pay package, excluding allowances and benefits.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Dearness Allowance (DA)</h4>
                <p className="text-green-800 text-sm">Cost of living adjustment allowance paid to compensate for inflation.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Years of Service</h4>
                <p className="text-purple-800 text-sm">Total number of years of continuous service with the organization.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Maximum Limit</h4>
                <p className="text-orange-800 text-sm">Maximum gratuity amount is capped at ₹20 lakhs as per current law.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Important Points to Remember</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Tax Exemption:</strong> Gratuity up to ₹20 lakhs is tax-free under Section 10(10) of the Income Tax Act</li>
              <li><strong>Maximum Limit:</strong> The maximum gratuity amount is ₹20 lakhs, regardless of salary or years of service</li>
              <li><strong>Partial Years:</strong> Service period of 6 months or more is considered as one full year</li>
              <li><strong>Last Salary:</strong> Gratuity is calculated based on the last drawn salary (Basic + DA)</li>
              <li><strong>Employer Contribution:</strong> Gratuity is paid by the employer, not deducted from salary</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Gratuity vs Other Benefits</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Benefit</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Eligibility</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Calculation</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Tax Treatment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Gratuity</td>
                    <td className="px-4 py-2 text-sm text-gray-900">5+ years</td>
                    <td className="px-4 py-2 text-sm text-gray-900">(Basic + DA) / 26 × Years</td>
                    <td className="px-4 py-2 text-sm text-gray-900">Tax-free up to ₹20L</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Provident Fund</td>
                    <td className="px-4 py-2 text-sm text-gray-900">Immediate</td>
                    <td className="px-4 py-2 text-sm text-gray-900">12% of Basic + DA</td>
                    <td className="px-4 py-2 text-sm text-gray-900">Tax-free if 5+ years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Leave Encashment</td>
                    <td className="px-4 py-2 text-sm text-gray-900">On retirement</td>
                    <td className="px-4 py-2 text-sm text-gray-900">Unused leaves × Daily salary</td>
                    <td className="px-4 py-2 text-sm text-gray-900">Tax-free up to ₹3L</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Use Our Gratuity Calculator</h3>
            <ol className="list-decimal list-inside text-gray-600 mb-6 space-y-2">
              <li>Enter your basic salary (excluding allowances and benefits)</li>
              <li>Input your dearness allowance (DA) amount</li>
              <li>Specify your years of service with the organization</li>
              <li>Enter your last drawn salary for reference</li>
              <li>Click &quot;Calculate Gratuity&quot; to get instant results</li>
              <li>View detailed breakdown and visual representation of your gratuity</li>
            </ol>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Gratuity Planning Tips</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Keep track of your service years and salary progression</li>
              <li>Understand the maximum limit and plan accordingly</li>
              <li>Consider the tax implications of gratuity payments</li>
              <li>Factor gratuity into your retirement planning</li>
              <li>Keep employment records for gratuity claims</li>
              <li>Consult with HR for company-specific gratuity policies</li>
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
                Professional business calculators for EMI, ROI, business valuation, break-even analysis, and gratuity calculation. 
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
                <li><a href="/gratuity-calculator" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">Gratuity Calculator</a></li>
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
