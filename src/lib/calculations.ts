import { EMICalculation, AmortizationEntry, BusinessValuationCalculation, ROICalculation, BreakEvenCalculation } from '@/types';

export function calculateEMI(principal: number, rate: number, years: number): EMICalculation {
  const monthlyRate = rate / 100 / 12;
  const totalMonths = years * 12;
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;
  
  const amortizationSchedule: AmortizationEntry[] = [];
  let balance = principal;
  
  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;
    balance = Math.max(0, balance - principalPayment);
    
    amortizationSchedule.push({
      month,
      principal: principalPayment,
      interest: interestPayment,
      balance,
      emi
    });
  }
  
  return {
    principal,
    rate,
    years,
    emi,
    totalPayment,
    totalInterest,
    amortizationSchedule
  };
}

export function calculateBusinessValuation(
  revenue: number,
  profitMargin: number,
  growthRate: number,
  discountRate: number
): BusinessValuationCalculation {
  const profit = revenue * (profitMargin / 100);
  const projectedProfit = profit * (1 + growthRate / 100);
  const valuation = projectedProfit / (discountRate / 100);
  const revenueMultiple = valuation / revenue;
  const profitMultiple = valuation / profit;
  
  return {
    revenue,
    profitMargin,
    growthRate,
    discountRate,
    valuation,
    revenueMultiple,
    profitMultiple
  };
}

export function calculateROI(
  initialInvestment: number,
  finalValue: number,
  timePeriod: number
): ROICalculation {
  const totalGain = finalValue - initialInvestment;
  const roi = (totalGain / initialInvestment) * 100;
  const annualizedROI = Math.pow(finalValue / initialInvestment, 1 / timePeriod) - 1;
  
  return {
    initialInvestment,
    finalValue,
    timePeriod,
    roi,
    annualizedROI: annualizedROI * 100,
    totalGain
  };
}

export function calculateBreakEven(
  fixedCosts: number,
  variableCosts: number,
  sellingPrice: number
): BreakEvenCalculation {
  const contributionMargin = sellingPrice - variableCosts;
  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * sellingPrice;
  
  return {
    fixedCosts,
    variableCosts,
    sellingPrice,
    breakEvenUnits,
    breakEvenRevenue,
    contributionMargin
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
  }).format(num);
}

