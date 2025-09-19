import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Calculator, Code, Users, Target, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About BizCalculator",
    "description": "Learn about BizCalculator - a team of tech enthusiasts creating productivity tools for businesses and entrepreneurs.",
    "url": "https://bizcalculator.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "BizCalculator",
      "description": "Tech enthusiasts creating productivity tools for businesses",
      "url": "https://bizcalculator.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="About Us - Tech Enthusiasts Creating Productivity Tools | BizCalculator"
        description="Meet the team behind BizCalculator. We are tech enthusiasts passionate about creating tools that help increase productivity and streamline business processes."
        canonical="https://bizcalculator.com/about"
        keywords={[
          'about bizcalculator',
          'tech enthusiasts',
          'productivity tools',
          'business calculators',
          'team',
          'mission'
        ]}
        structuredData={structuredData}
      />
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About BizCalculator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We are a team of passionate tech enthusiasts dedicated to creating tools 
            that help businesses and entrepreneurs increase productivity by any means necessary.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Target className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  To democratize financial planning and business analysis by providing free, 
                  accurate, and easy-to-use calculators that empower entrepreneurs and businesses 
                  to make informed decisions. We believe that every business owner should have 
                  access to professional-grade financial tools without the complexity or cost barriers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We constantly explore new technologies and methodologies to create 
                cutting-edge tools that solve real business problems.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe financial tools should be accessible to everyone, 
                regardless of technical expertise or budget constraints.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 shadow-lg text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Efficiency</h3>
              <p className="text-gray-600">
                Our tools are designed to save time and streamline processes, 
                helping you focus on what matters most - growing your business.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 shadow-lg text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                We are genuinely passionate about technology and its potential 
                to transform how businesses operate and make decisions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accuracy</h3>
              <p className="text-gray-600">
                Every calculation is meticulously tested and verified to ensure 
                you can trust our tools for critical business decisions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200 shadow-lg text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Impact</h3>
              <p className="text-gray-600">
                We measure our success by the positive impact our tools have 
                on businesses and entrepreneurs worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
              <div className="prose max-w-none text-lg text-gray-600">
                <p className="mb-6">
                  BizCalculator was born from a simple observation: many entrepreneurs and small business 
                  owners struggle with complex financial calculations and business analysis. As tech enthusiasts, 
                  we saw an opportunity to leverage our technical skills to solve real-world problems.
                </p>
                
                <p className="mb-6">
                  What started as a side project to help a friend calculate EMI for his business loan 
                  quickly evolved into a comprehensive suite of financial tools. We realized that by 
                  combining our passion for technology with our understanding of business needs, 
                  we could create something truly valuable.
                </p>
                
                <p className="mb-6">
                  Today, BizCalculator serves thousands of users worldwide, from individual entrepreneurs 
                  to established businesses. Our tools have helped users make informed decisions about 
                  loans, investments, business valuations, and break-even analysis.
                </p>
                
                <p className="mb-6">
                  We&apos;re not just building calculators; we&apos;re building confidence. Every time someone 
                  uses our tools to make a better business decision, we know we&apos;re fulfilling our 
                  mission of increasing productivity and empowering entrepreneurs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Built with Modern Technology</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Tech Stack</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <strong>Next.js & React:</strong> For fast, responsive user interfaces
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <strong>TypeScript:</strong> For type-safe, maintainable code
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <strong>Tailwind CSS:</strong> For beautiful, consistent design
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <strong>Chart.js:</strong> For interactive data visualizations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      <strong>Vercel:</strong> For reliable, global deployment
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Approach</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <strong>User-Centric Design:</strong> Every feature is designed with the user in mind
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <strong>Mobile-First:</strong> Optimized for all devices and screen sizes
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <strong>Performance:</strong> Fast loading times and smooth interactions
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <strong>Accessibility:</strong> Built to be usable by everyone
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      <strong>Privacy:</strong> Your data stays on your device, always
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of users who trust BizCalculator for their financial planning needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try Our Calculators
            </Link>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 BizCalculator. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ by tech enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
