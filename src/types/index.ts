export interface EMICalculation {
  principal: number;
  rate: number;
  years: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  emi: number;
}

export interface BusinessValuationCalculation {
  revenue: number;
  profitMargin: number;
  growthRate: number;
  discountRate: number;
  valuation: number;
  revenueMultiple: number;
  profitMultiple: number;
}

export interface ROICalculation {
  initialInvestment: number;
  finalValue: number;
  timePeriod: number;
  roi: number;
  annualizedROI: number;
  totalGain: number;
}

export interface BreakEvenCalculation {
  fixedCosts: number;
  variableCosts: number;
  sellingPrice: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
}

export interface CalculatorParams {
  loan?: string;
  rate?: string;
  years?: string;
  revenue?: string;
  profitMargin?: string;
  growthRate?: string;
  discountRate?: string;
  initialInvestment?: string;
  finalValue?: string;
  timePeriod?: string;
  fixedCosts?: string;
  variableCosts?: string;
  sellingPrice?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
}
