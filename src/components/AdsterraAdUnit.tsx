'use client';

import { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (consent.ads && typeof window !== 'undefined') {
      try {
        // Mobile ad configuration
        const mobileConfig = {
          'key': 'b280e8a46905b2b25be32dbed68140d7',
          'format': 'iframe',
          'height': 250,
          'width': 300,
          'params': {}
        };

        // Desktop ad configuration
        const desktopConfig = {
          'key': '6cb2db769ea45b55473961cb9d425c80',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };

        // Choose configuration based on device
        const config = isMobile ? mobileConfig : desktopConfig;

        // Set up Adsterra configuration
        window.atOptions = config;

        // Create the configuration script
        const configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.innerHTML = `
          atOptions = {
            'key': '${config.key}',
            'format': '${config.format}',
            'height': ${config.height},
            'width': ${config.width},
            'params': {}
          };
        `;

        // Create the invoke script
        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = `//www.highperformanceformat.com/${config.key}/invoke.js`;
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
  }, [consent.ads, isMobile]);

  if (!consent.ads) return null;

  return (
    <div className={`adsterra-ad-container ${className}`}>
      <div 
        id="adsterra-ad"
        style={{ 
          display: 'block',
          width: '100%',
          height: isMobile ? '250px' : '90px',
          maxWidth: isMobile ? '300px' : '728px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      />
    </div>
  );
}
