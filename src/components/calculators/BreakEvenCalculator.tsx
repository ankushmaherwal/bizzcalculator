'use client';

import React, { useState, useEffect } from 'react';
// Card components removed - using custom divs instead
import { SliderWithInput } from '../ui/SliderWithInput';
import { calculateBreakEven, formatCurrency, formatNumber } from '@/lib/calculations';
import { BreakEvenCalculation } from '@/types';

interface BreakEvenCalculatorProps {
  initialValues?: {
    fixedCosts: number;
    variableCosts: number;
    sellingPrice: number;
  };
}

export function BreakEvenCalculator({ initialValues }: BreakEvenCalculatorProps) {
  const [fixedCosts, setFixedCosts] = useState(initialValues?.fixedCosts || 50000);
  const [variableCosts, setVariableCosts] = useState(initialValues?.variableCosts || 100);
  const [sellingPrice, setSellingPrice] = useState(initialValues?.sellingPrice || 200);
  const [calculation, setCalculation] = useState<BreakEvenCalculation | null>(null);

  useEffect(() => {
    const result = calculateBreakEven(fixedCosts, variableCosts, sellingPrice);
    setCalculation(result);
  }, [fixedCosts, variableCosts, sellingPrice]);


  if (!calculation) return null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Break-Even Analysis Calculator
        </h1>
        <p className="text-xl text-slate-600">
          Determine your break-even point for products and services
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SliderWithInput
              value={fixedCosts}
              onChange={setFixedCosts}
              min={1000}
              max={1000000}
              step={1000}
              label="Fixed Costs"
              unit="₹"
              formatValue={(val) => val.toString()}
            />
            
            <SliderWithInput
              value={variableCosts}
              onChange={setVariableCosts}
              min={1}
              max={1000}
              step={1}
              label="Variable Cost per Unit"
              unit="₹"
              formatValue={(val) => val.toString()}
            />
            
            <SliderWithInput
              value={sellingPrice}
              onChange={setSellingPrice}
              min={1}
              max={2000}
              step={1}
              label="Selling Price per Unit"
              unit="₹"
              formatValue={(val) => val.toString()}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-600 mb-2">Break-Even Units</div>
            <div className="text-3xl font-bold text-blue-700">
              {formatNumber(calculation.breakEvenUnits, 0)}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-green-600 mb-2">Break-Even Revenue</div>
            <div className="text-3xl font-bold text-green-700">
              {formatCurrency(calculation.breakEvenRevenue)}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-purple-600 mb-2">Contribution Margin</div>
            <div className="text-3xl font-bold text-purple-700">
              {formatCurrency(calculation.contributionMargin)}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-orange-600 mb-2">Margin %</div>
            <div className="text-3xl font-bold text-orange-700">
              {formatNumber((calculation.contributionMargin / calculation.sellingPrice) * 100, 1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

