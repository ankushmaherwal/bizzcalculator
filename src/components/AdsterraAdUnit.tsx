'use client';

import { useEffect } from 'react';
import { useConsent } from '@/hooks/useConsent';

declare global {
  interface Window {
    atOptions: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

interface AdsterraAdUnitProps {
  className?: string;
}

export function AdsterraAdUnit({ className = '' }: AdsterraAdUnitProps) {
  const { consent } = useConsent();

  useEffect(() => {
    if (consent.ads && typeof window !== 'undefined') {
      try {
        // Initialize Adsterra configuration
        window.atOptions = {
          'key': '6cb2db769ea45b55473961cb9d425c80',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };

        // Load Adsterra script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//www.highperformanceformat.com/6cb2db769ea45b55473961cb9d425c80/invoke.js';
        script.async = true;
        
        // Append to head
        document.head.appendChild(script);

        return () => {
          // Cleanup script on unmount
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        };
      } catch (error) {
        console.error('Error loading Adsterra ad:', error);
      }
    }
  }, [consent.ads]);

  if (!consent.ads) return null;

  return (
    <div className={`adsterra-ad-container ${className}`}>
      <div 
        id="adsterra-ad"
        style={{ 
          display: 'block',
          width: '100%',
          height: '90px',
          maxWidth: '728px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      />
    </div>
  );
}
