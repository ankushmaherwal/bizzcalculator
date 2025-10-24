'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { GratuityChart } from './charts/GratuityChart';

interface GratuityCalculatorProps {
  initialValues: {
    basicSalary: number;
    da: number;
    yearsOfService: number;
    lastDrawnSalary: number;
  };
}

interface GratuityResult {
  gratuityAmount: number;
  maximumGratuity: number;
  actualGratuity: number;
  formula: string;
  breakdown: {
    basicSalary: number;
    da: number;
    totalSalary: number;
    yearsOfService: number;
    gratuityPerYear: number;
    totalGratuity: number;
    maximumLimit: number;
  };
}

export function GratuityCalculator({ initialValues }: GratuityCalculatorProps) {
  const [basicSalary, setBasicSalary] = useState(initialValues.basicSalary);
  const [da, setDa] = useState(initialValues.da);
  const [yearsOfService, setYearsOfService] = useState(initialValues.yearsOfService);
  const [lastDrawnSalary, setLastDrawnSalary] = useState(initialValues.lastDrawnSalary);
  const [result, setResult] = useState<GratuityResult | null>(null);

  const calculateGratuity = useCallback(() => {
    const totalSalary = basicSalary + da;
    const gratuityPerYear = totalSalary / 26; // 26 working days in a month
    const totalGratuity = gratuityPerYear * yearsOfService;
    const maximumGratuity = 2000000; // Maximum gratuity limit as per Indian law
    const actualGratuity = Math.min(totalGratuity, maximumGratuity);

    const gratuityResult: GratuityResult = {
      gratuityAmount: actualGratuity,
      maximumGratuity,
      actualGratuity,
      formula: `Gratuity = (Basic Salary + DA) / 26 × Years of Service`,
      breakdown: {
        basicSalary,
        da,
        totalSalary,
        yearsOfService,
        gratuityPerYear,
        totalGratuity,
        maximumLimit: maximumGratuity,
      },
    };

    setResult(gratuityResult);
  }, [basicSalary, da, yearsOfService]);

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
              <Label htmlFor="basicSalary">Basic Salary (₹)</Label>
              <Input
                id="basicSalary"
                type="number"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                placeholder="Enter basic salary"
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="da">Dearness Allowance (₹)</Label>
              <Input
                id="da"
                type="number"
                value={da}
                onChange={(e) => setDa(Number(e.target.value))}
                placeholder="Enter DA amount"
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearsOfService">Years of Service</Label>
              <Input
                id="yearsOfService"
                type="number"
                value={yearsOfService}
                onChange={(e) => setYearsOfService(Number(e.target.value))}
                placeholder="Enter years of service"
                className="text-lg"
                min="0"
                step="0.5"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastDrawnSalary">Last Drawn Salary (₹)</Label>
              <Input
                id="lastDrawnSalary"
                type="number"
                value={lastDrawnSalary}
                onChange={(e) => setLastDrawnSalary(Number(e.target.value))}
                placeholder="Enter last drawn salary"
                className="text-lg"
              />
            </div>
          </div>
          
          <Button 
            onClick={calculateGratuity}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Calculate Gratuity
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <span className="text-gray-600">Basic Salary + DA:</span>
                  <span className="font-semibold">{formatCurrency(result.breakdown.totalSalary)}</span>
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

          {/* Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Gratuity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <GratuityChart data={result.breakdown} />
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
              Gratuity = (Basic Salary + DA) / 26 × Years of Service
            </p>
            <p className="text-sm text-gray-600">
              Where 26 represents the number of working days in a month
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
