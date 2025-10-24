'use client';

import { useState, useEffect } from 'react';

interface ConsentState {
  analytics: boolean;
  ads: boolean;
  necessary: boolean;
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    ads: false,
    necessary: true,
  });

  useEffect(() => {
    // Load saved consent from localStorage
    const savedConsent = localStorage.getItem('bizcalculator-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
      } catch (error) {
        console.error('Error parsing saved consent:', error);
      }
    }
  }, []);

  return { consent, setConsent };
}
