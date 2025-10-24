'use client';

import { useState, useEffect } from 'react';
import { ConsentManager } from './ConsentManager';
import { GoogleAnalytics } from './GoogleAnalytics';
import { AdsterraAds } from './AdsterraAds';

interface ConsentWrapperProps {
  children: React.ReactNode;
}

export function ConsentWrapper({ children }: ConsentWrapperProps) {
  const [consent, setConsent] = useState({
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

  return (
    <>
      <ConsentManager onConsentChange={setConsent} />
      <GoogleAnalytics 
        gaId={process.env.NEXT_PUBLIC_GA_ID || ''} 
        consent={consent.analytics} 
      />
      <AdsterraAds consent={consent.ads} />
      {children}
    </>
  );
}
