'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
// import { GratuityChart } from './charts/GratuityChart'; // Removed chart

interface GratuityCalculatorProps {
  initialValues: {
    monthlySalary: number;
    yearsOfService: number;
  };
}

interface GratuityResult {
  gratuityAmount: number;
  maximumGratuity: number;
  actualGratuity: number;
  formula: string;
  breakdown: {
    monthlySalary: number;
    yearsOfService: number;
    gratuityPerYear: number;
    totalGratuity: number;
    maximumLimit: number;
  };
}

export function GratuityCalculator({ initialValues }: GratuityCalculatorProps) {
  const [monthlySalary, setMonthlySalary] = useState(initialValues.monthlySalary);
  const [yearsOfService, setYearsOfService] = useState(initialValues.yearsOfService);
  const [result, setResult] = useState<GratuityResult | null>(null);

  const calculateGratuity = useCallback(() => {
    // Using the correct formula: G = n*b*15/26
    // where n = years of service, b = monthly salary (basic + DA)
    const gratuityPerYear = (monthlySalary * 15) / 26; // 15 days salary per year
    const totalGratuity = gratuityPerYear * yearsOfService;
    const maximumGratuity = 2000000; // Maximum gratuity limit as per Indian law
    const actualGratuity = Math.min(totalGratuity, maximumGratuity);

    const gratuityResult: GratuityResult = {
      gratuityAmount: actualGratuity,
      maximumGratuity,
      actualGratuity,
      formula: `Gratuity = Years of Service × Monthly Salary × 15 / 26`,
      breakdown: {
        monthlySalary,
        yearsOfService,
        gratuityPerYear,
        totalGratuity,
        maximumLimit: maximumGratuity,
      },
    };

    setResult(gratuityResult);
  }, [monthlySalary, yearsOfService]);

  useEffect(() => {
    calculateGratuity();
  }, [calculateGratuity]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gratuity Calculator
          </CardTitle>
          <p className="text-gray-600">
            Calculate your gratuity amount based on your salary and years of service
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="monthlySalary">Monthly Salary (₹)</Label>
              <Input
                id="monthlySalary"
                type="number"
                value={monthlySalary || ''}
                onChange={(e) => setMonthlySalary(Number(e.target.value) || 0)}
                placeholder="Enter monthly salary (Basic + DA)"
                className="text-lg"
              />
              <p className="text-sm text-gray-500">Basic Salary + Dearness Allowance</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearsOfService">Years of Service</Label>
              <Input
                id="yearsOfService"
                type="number"
                value={yearsOfService || ''}
                onChange={(e) => setYearsOfService(Number(e.target.value) || 0)}
                placeholder="Enter years of service"
                className="text-lg"
                min="0"
                step="0.5"
              />
              <p className="text-sm text-gray-500">Number of years worked in the organization</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 gap-8">
          {/* Summary Card */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-800">Gratuity Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(result.gratuityAmount)}
                </div>
                <p className="text-green-700 font-medium">Total Gratuity Amount</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Monthly Salary:</span>
                  <span className="font-semibold">{formatCurrency(result.breakdown.monthlySalary)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Years of Service:</span>
                  <span className="font-semibold">{result.breakdown.yearsOfService} years</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Gratuity per Year:</span>
                  <span className="font-semibold">{formatCurrency(result.breakdown.gratuityPerYear)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Maximum Limit:</span>
                  <span className="font-semibold">{formatCurrency(result.breakdown.maximumLimit)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Formula Section */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Gratuity Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-lg font-mono text-gray-800 mb-2">
              Gratuity = Years of Service × Monthly Salary × 15 / 26
            </p>
            <p className="text-sm text-gray-600">
              Where 15 represents days of salary per year, 26 represents working days in a month
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
