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
        // Set up Adsterra configuration exactly as provided
        window.atOptions = {
          'key': '6cb2db769ea45b55473961cb9d425c80',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };

        // Create the configuration script
        const configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.innerHTML = `
          atOptions = {
            'key': '6cb2db769ea45b55473961cb9d425c80',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
          };
        `;

        // Create the invoke script
        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = '//www.highperformanceformat.com/6cb2db769ea45b55473961cb9d425c80/invoke.js';
        invokeScript.async = true;

        // Append both scripts to the ad container
        const adContainer = document.getElementById('adsterra-ad');
        if (adContainer) {
          adContainer.appendChild(configScript);
          adContainer.appendChild(invokeScript);
        }

        return () => {
          // Cleanup scripts on unmount
          if (adContainer && adContainer.contains(configScript)) {
            adContainer.removeChild(configScript);
          }
          if (adContainer && adContainer.contains(invokeScript)) {
            adContainer.removeChild(invokeScript);
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
