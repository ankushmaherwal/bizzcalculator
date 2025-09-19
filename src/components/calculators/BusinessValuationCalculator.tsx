'use client';

import React, { useState, useEffect } from 'react';
// Card components removed - using custom divs instead
import { SliderWithInput } from '../ui/SliderWithInput';
import { calculateBusinessValuation, formatCurrency, formatNumber } from '@/lib/calculations';
import { BusinessValuationCalculation } from '@/types';

interface BusinessValuationCalculatorProps {
  initialValues?: {
    revenue: number;
    profitMargin: number;
    growthRate: number;
    discountRate: number;
  };
}

export function BusinessValuationCalculator({ initialValues }: BusinessValuationCalculatorProps) {
  const [revenue, setRevenue] = useState(initialValues?.revenue || 1000000);
  const [profitMargin, setProfitMargin] = useState(initialValues?.profitMargin || 15);
  const [growthRate, setGrowthRate] = useState(initialValues?.growthRate || 10);
  const [discountRate, setDiscountRate] = useState(initialValues?.discountRate || 12);
  const [calculation, setCalculation] = useState<BusinessValuationCalculation | null>(null);

  useEffect(() => {
    const result = calculateBusinessValuation(revenue, profitMargin, growthRate, discountRate);
    setCalculation(result);
  }, [revenue, profitMargin, growthRate, discountRate]);


  if (!calculation) return null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Business Valuation Calculator
        </h1>
        <p className="text-xl text-slate-600">
          Estimate your business value using revenue multiples and growth projections
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SliderWithInput
              value={revenue}
              onChange={setRevenue}
              min={100000}
              max={10000000}
              step={100000}
              label="Annual Revenue"
              unit="₹"
              formatValue={(val) => val.toString()}
            />
            
            <SliderWithInput
              value={profitMargin}
              onChange={setProfitMargin}
              min={1}
              max={50}
              step={1}
              label="Profit Margin"
              unit="%"
              formatValue={(val) => val.toString()}
            />
            
            <SliderWithInput
              value={growthRate}
              onChange={setGrowthRate}
              min={0}
              max={50}
              step={1}
              label="Growth Rate"
              unit="%"
              formatValue={(val) => val.toString()}
            />
            
            <SliderWithInput
              value={discountRate}
              onChange={setDiscountRate}
              min={5}
              max={30}
              step={1}
              label="Discount Rate"
              unit="%"
              formatValue={(val) => val.toString()}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-600 mb-2">Business Valuation</div>
            <div className="text-3xl font-bold text-blue-700">
              {formatCurrency(calculation.valuation)}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-green-600 mb-2">Revenue Multiple</div>
            <div className="text-3xl font-bold text-green-700">
              {formatNumber(calculation.revenueMultiple, 1)}x
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-purple-600 mb-2">Profit Multiple</div>
            <div className="text-3xl font-bold text-purple-700">
              {formatNumber(calculation.profitMultiple, 1)}x
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-orange-600 mb-2">Annual Profit</div>
            <div className="text-3xl font-bold text-orange-700">
              {formatCurrency(calculation.revenue * (calculation.profitMargin / 100))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

