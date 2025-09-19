import { test, expect } from '@playwright/test';

test.describe('EMI Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator/emi-loan');
  });

  test('should render EMI calculator page with SSR', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('EMI Loan Calculator');
    await expect(page.locator('[data-testid="emi-calculator"]')).toBeVisible();
  });

  test('should calculate EMI with default values', async ({ page }) => {
    await page.waitForSelector('[data-testid="emi-result"]');
    
    const emiValue = await page.locator('[data-testid="emi-value"]').textContent();
    expect(emiValue).toMatch(/₹[\d,]+/);
  });

  test('should update calculations when sliders change', async ({ page }) => {
    const principalSlider = page.locator('[data-testid="principal-slider"]');
    const emiValue = page.locator('[data-testid="emi-value"]');
    
    const initialEMI = await emiValue.textContent();
    
    await principalSlider.fill('2000000');
    await page.waitForTimeout(500);
    
    const updatedEMI = await emiValue.textContent();
    expect(updatedEMI).not.toBe(initialEMI);
  });

  test('should handle URL parameters correctly', async ({ page }) => {
    await page.goto('/calculator/emi-loan?loan=2000000&rate=10&years=15');
    
    await page.waitForSelector('[data-testid="emi-calculator"]');
    
    const principalInput = page.locator('[data-testid="principal-input"]');
    const rateInput = page.locator('[data-testid="rate-input"]');
    const yearsInput = page.locator('[data-testid="years-input"]');
    
    await expect(principalInput).toHaveValue('2000000');
    await expect(rateInput).toHaveValue('10');
    await expect(yearsInput).toHaveValue('15');
  });

  test('should load Google Analytics after consent', async ({ page }) => {
    // Check if consent banner is visible
    const consentBanner = page.locator('[data-testid="consent-banner"]');
    if (await consentBanner.isVisible()) {
      await page.click('[data-testid="accept-analytics"]');
    }
    
    // Wait for GA to load
    await page.waitForTimeout(2000);
    
    // Check if GA script is loaded
    const gaScript = page.locator('script[src*="googletagmanager.com"]');
    await expect(gaScript).toBeAttached();
  });

  test('should share calculation URL', async ({ page }) => {
    await page.click('[data-testid="share-button"]');
    
    // Check if URL was copied to clipboard
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('/calculator/emi-loan?');
    expect(clipboardText).toContain('loan=');
    expect(clipboardText).toContain('rate=');
    expect(clipboardText).toContain('years=');
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await expect(page.locator('[data-testid="emi-calculator"]')).toBeVisible();
    await expect(page.locator('[data-testid="results-grid"]')).toBeVisible();
  });
});

