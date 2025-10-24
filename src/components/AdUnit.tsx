'use client';

import { useEffect } from 'react';
import { useConsent } from '@/hooks/useConsent';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  className?: string;
}

export function AdUnit({ className = '' }: AdUnitProps) {
  const { consent } = useConsent();

  useEffect(() => {
    if (consent.ads && typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading ad:', error);
      }
    }
  }, [consent.ads]);

  if (!consent.ads) return null;

  return (
    <div className={`ad-container ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7550399842512650"
        data-ad-slot=""
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
