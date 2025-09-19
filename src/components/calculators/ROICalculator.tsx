'use client';

import React, { useState, useEffect } from 'react';
// Card components removed - using custom divs instead
import { SliderWithInput } from '../ui/SliderWithInput';
import { calculateROI, formatCurrency, formatNumber } from '@/lib/calculations';
import { ROICalculation } from '@/types';

interface ROICalculatorProps {
  initialValues?: {
    initialInvestment: number;
    finalValue: number;
    timePeriod: number;
  };
}

export function ROICalculator({ initialValues }: ROICalculatorProps) {
  const [initialInvestment, setInitialInvestment] = useState(initialValues?.initialInvestment || 100000);
  const [finalValue, setFinalValue] = useState(initialValues?.finalValue || 150000);
  const [timePeriod, setTimePeriod] = useState(initialValues?.timePeriod || 1);
  const [calculation, setCalculation] = useState<ROICalculation | null>(null);

  useEffect(() => {
    const result = calculateROI(initialInvestment, finalValue, timePeriod);
    setCalculation(result);
  }, [initialInvestment, finalValue, timePeriod]);


  if (!calculation) return null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          ROI Calculator
        </h1>
        <p className="text-xl text-slate-600">
          Calculate return on investment and annualized returns for your investments
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SliderWithInput
              value={initialInvestment}
              onChange={setInitialInvestment}
              min={1000}
              max={10000000}
              step={1000}
              label="Initial Investment"
              unit="₹"
              formatValue={(val) => val.toString()}
            />
            
            <SliderWithInput
              value={finalValue}
              onChange={setFinalValue}
              min={1000}
              max={10000000}
              step={1000}
              label="Final Value"
              unit="₹"
              formatValue={(val) => val.toString()}
            />
            
            <SliderWithInput
              value={timePeriod}
              onChange={setTimePeriod}
              min={0.25}
              max={20}
              step={0.25}
              label="Time Period"
              unit="years"
              formatValue={(val) => val.toString()}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-green-600 mb-2">Total ROI</div>
            <div className={`text-3xl font-bold ${calculation.roi >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatNumber(calculation.roi, 1)}%
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-600 mb-2">Annualized ROI</div>
            <div className={`text-3xl font-bold ${calculation.annualizedROI >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
              {formatNumber(calculation.annualizedROI, 1)}%
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-purple-600 mb-2">Total Gain</div>
            <div className={`text-3xl font-bold ${calculation.totalGain >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
              {formatCurrency(calculation.totalGain)}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-indigo-600 mb-2">Final Value</div>
            <div className="text-3xl font-bold text-indigo-700">
              {formatCurrency(calculation.finalValue)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

