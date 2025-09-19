import { 
  calculateEMI, 
  calculateBusinessValuation, 
  calculateROI, 
  calculateBreakEven,
  formatCurrency,
  formatNumber 
} from '../calculations';

describe('EMI Calculations', () => {
  test('should calculate EMI correctly', () => {
    const result = calculateEMI(1000000, 8.5, 20);
    
    expect(result.principal).toBe(1000000);
    expect(result.rate).toBe(8.5);
    expect(result.years).toBe(20);
    expect(result.emi).toBeCloseTo(8678.23, 1);
    expect(result.totalPayment).toBeCloseTo(2082775.76, 1);
    expect(result.totalInterest).toBeCloseTo(1082775.76, 1);
    expect(result.amortizationSchedule).toHaveLength(240);
  });

  test('should handle edge cases', () => {
    const result = calculateEMI(100000, 10, 1);
    expect(result.emi).toBeGreaterThan(0);
    expect(result.totalPayment).toBeGreaterThan(result.principal);
  });
});

describe('Business Valuation Calculations', () => {
  test('should calculate business valuation correctly', () => {
    const result = calculateBusinessValuation(1000000, 15, 10, 12);
    
    expect(result.revenue).toBe(1000000);
    expect(result.profitMargin).toBe(15);
    expect(result.growthRate).toBe(10);
    expect(result.discountRate).toBe(12);
    expect(result.valuation).toBeCloseTo(1375000, 2);
    expect(result.revenueMultiple).toBeCloseTo(1.375, 3);
    expect(result.profitMultiple).toBeCloseTo(9.17, 2);
  });
});

describe('ROI Calculations', () => {
  test('should calculate ROI correctly', () => {
    const result = calculateROI(100000, 150000, 2);
    
    expect(result.initialInvestment).toBe(100000);
    expect(result.finalValue).toBe(150000);
    expect(result.timePeriod).toBe(2);
    expect(result.roi).toBe(50);
    expect(result.annualizedROI).toBeCloseTo(22.47, 2);
    expect(result.totalGain).toBe(50000);
  });

  test('should handle negative ROI', () => {
    const result = calculateROI(100000, 80000, 1);
    expect(result.roi).toBe(-20);
    expect(result.totalGain).toBe(-20000);
  });
});

describe('Break-Even Calculations', () => {
  test('should calculate break-even correctly', () => {
    const result = calculateBreakEven(50000, 100, 200);
    
    expect(result.fixedCosts).toBe(50000);
    expect(result.variableCosts).toBe(100);
    expect(result.sellingPrice).toBe(200);
    expect(result.breakEvenUnits).toBe(500);
    expect(result.breakEvenRevenue).toBe(100000);
    expect(result.contributionMargin).toBe(100);
  });
});

describe('Formatting Functions', () => {
  test('should format currency correctly', () => {
    expect(formatCurrency(1000000)).toBe('₹10,00,000');
    expect(formatCurrency(1234567)).toBe('₹12,34,567');
  });

  test('should format numbers correctly', () => {
    expect(formatNumber(1234.567, 2)).toBe('1,234.57');
    expect(formatNumber(1234.567, 0)).toBe('1,235');
  });
});
