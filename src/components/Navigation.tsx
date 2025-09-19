'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from './ui/Button';

export function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">BizCalculator</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`flex items-center space-x-1 transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <DollarSign className="h-4 w-4" />
              <span>EMI Calculator</span>
            </Link>
            <Link 
              href="/business-valuation" 
              className={`flex items-center space-x-1 transition-colors duration-200 ${
                isActive('/business-valuation') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Business Valuation</span>
            </Link>
            <Link 
              href="/roi-calculator" 
              className={`flex items-center space-x-1 transition-colors duration-200 ${
                isActive('/roi-calculator') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>ROI Calculator</span>
            </Link>
            <Link 
              href="/break-even-analysis" 
              className={`flex items-center space-x-1 transition-colors duration-200 ${
                isActive('/break-even-analysis') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Break-Even Analysis</span>
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

