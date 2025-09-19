'use client';

import React, { useState, useEffect } from 'react';
// Card components removed - using custom divs instead
import { SliderWithInput } from '../ui/SliderWithInput';
import { calculateEMI, formatCurrency, formatNumber } from '@/lib/calculations';
import { EMICalculation } from '@/types';
import dynamic from 'next/dynamic';

// Lazy load charts
const EMIPieChart = dynamic(() => import('./charts/EMIPieChart').then(mod => ({ default: mod.EMIPieChart })), { ssr: false });
const AmortizationChart = dynamic(() => import('./charts/AmortizationChart').then(mod => ({ default: mod.AmortizationChart })), { ssr: false });

interface EMICalculatorProps {
  initialValues?: {
    principal: number;
    rate: number;
    years: number;
  };
}

export function EMICalculator({ initialValues }: EMICalculatorProps) {
  const [principal, setPrincipal] = useState(initialValues?.principal || 1000000);
  const [rate, setRate] = useState(initialValues?.rate || 8.5);
  const [years, setYears] = useState(initialValues?.years || 20);
  const [calculation, setCalculation] = useState<EMICalculation | null>(null);

  useEffect(() => {
    const result = calculateEMI(principal, rate, years);
    setCalculation(result);
  }, [principal, rate, years]);


  if (!calculation) return null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          EMI Calculator
        </h1>
        <p className="text-xl text-slate-600">
          Calculate your monthly EMI payments with detailed amortization schedule
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SliderWithInput
            value={principal}
            onChange={setPrincipal}
            min={100000}
            max={10000000}
            step={50000}
            label="Loan Amount"
            unit="₹"
            formatValue={(val) => val.toString()}
          />
          
          <SliderWithInput
            value={rate}
            onChange={setRate}
            min={1}
            max={25}
            step={0.1}
            label="Interest Rate"
            unit="%"
            formatValue={(val) => val.toFixed(1)}
          />
          
          <SliderWithInput
            value={years}
            onChange={setYears}
            min={1}
            max={30}
            step={1}
            label="Loan Tenure"
            unit="years"
            formatValue={(val) => val.toString()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-600 mb-2">Monthly EMI</div>
            <div className="text-3xl font-bold text-blue-700">
              {formatCurrency(calculation.emi)}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-green-600 mb-2">Total Payment</div>
            <div className="text-3xl font-bold text-green-700">
              {formatCurrency(calculation.totalPayment)}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-red-600 mb-2">Total Interest</div>
            <div className="text-3xl font-bold text-red-700">
              {formatCurrency(calculation.totalInterest)}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg">
          <div className="text-center">
            <div className="text-sm font-medium text-purple-600 mb-2">Interest as % of Principal</div>
            <div className="text-3xl font-bold text-purple-700">
              {formatNumber(calculation.totalInterest / calculation.principal * 100, 1)}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Principal vs Interest</h3>
          <p className="text-sm text-gray-600 mb-4">
            Breakdown of your EMI payment
          </p>
          <EMIPieChart 
            principal={calculation.principal}
            totalInterest={calculation.totalInterest}
          />
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Amortization Schedule</h3>
          <p className="text-sm text-gray-600 mb-4">
            Principal and interest payments over time
          </p>
          <AmortizationChart 
            schedule={calculation.amortizationSchedule}
          />
        </div>
      </div>
    </div>
  );
}
