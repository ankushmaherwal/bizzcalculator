'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [captcha, setCaptcha] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Generate simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setCaptcha(`${num1} + ${num2} = ?`);
    setCaptchaAnswer(answer.toString());
  };

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate captcha
    if (captcha !== captchaAnswer) {
      alert('Please solve the captcha correctly');
      generateCaptcha();
      return;
    }

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // In a real application, you would send this to your backend
      // For now, we&apos;ll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate email sending to bizzcalculator@outlook.com
      console.log('Email would be sent to bizzcalculator@outlook.com with:', {
        to: 'bizzcalculator@outlook.com',
        from: formData.email,
        subject: `Contact Form Submission from ${formData.name}`,
        message: formData.message
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      generateCaptcha();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact BizCalculator",
    "description": "Get in touch with the BizCalculator team. We&apos;re here to help with any questions about our financial calculators.",
    "url": "https://bizcalculator.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "BizCalculator",
      "email": "bizzcalculator@outlook.com",
      "url": "https://bizcalculator.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Contact Us - Get in Touch | BizCalculator"
        description="Contact the BizCalculator team for support, feedback, or questions about our financial calculators. We&apos;re here to help!"
        canonical="https://bizcalculator.com/contact"
        keywords={[
          'contact bizcalculator',
          'support',
          'feedback',
          'help',
          'customer service',
          'get in touch'
        ]}
        structuredData={structuredData}
      />
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Have questions about our calculators? Need help with a specific calculation? 
            We&apos;d love to hear from you! Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div>
                  <Label htmlFor="captcha">Security Check *</Label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-md font-mono text-lg">
                      {captcha}
                    </div>
                    <Input
                      id="captcha"
                      type="text"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      required
                      className="w-24"
                      placeholder="?"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Please solve the math problem above to verify you&apos;re human.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                {submitStatus === 'success' && (
                  <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-md">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Message sent successfully! We&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  We&apos;re here to help with any questions about our calculators.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">bizzcalculator@outlook.com</p>
                    <p className="text-sm text-gray-500 mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                    <p className="text-gray-600">24-48 hours</p>
                    <p className="text-sm text-gray-500 mt-1">
                      We check our inbox regularly
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">Remote Team</p>
                    <p className="text-sm text-gray-500 mt-1">
                      We&apos;re a distributed team of tech enthusiasts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Are your calculators free?</h4>
                  <p className="text-gray-600 text-sm">
                    Yes! All our calculators are completely free to use with no hidden fees or subscriptions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">How accurate are the calculations?</h4>
                  <p className="text-gray-600 text-sm">
                    Our calculations are based on standard financial formulas and are highly accurate. 
                    However, always consult with a financial advisor for important decisions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can I use these for business purposes?</h4>
                  <p className="text-gray-600 text-sm">
                    Absolutely! Our calculators are designed for both personal and business use. 
                    They&apos;re perfect for entrepreneurs and business owners.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Do you store my data?</h4>
                  <p className="text-gray-600 text-sm">
                    No, we don&apos;t store any of your personal data or calculation inputs. 
                    All calculations are performed locally in your browser.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Why Contact Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Bug Reports</h3>
                <p className="text-gray-600 text-sm">
                  Found an issue with our calculators? Let us know so we can fix it quickly.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Feature Requests</h3>
                <p className="text-gray-600 text-sm">
                  Have an idea for a new calculator or feature? We&apos;d love to hear it!
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">General Support</h3>
                <p className="text-gray-600 text-sm">
                  Need help understanding how to use our tools? We&apos;re here to help!
                </p>
              </div>
            </div>
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
