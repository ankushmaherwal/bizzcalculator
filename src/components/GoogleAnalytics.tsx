'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  gaId: string;
  consent: boolean;
}

export function GoogleAnalytics({ gaId, consent }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (consent && gaId) {
      // Initialize GA4
      if (!window.gtag) {
        window.gtag = function(...args: unknown[]) {
          (window.gtag.q = window.gtag.q || []).push(args);
        } as typeof window.gtag;
      }
      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [consent, gaId]);

  if (!consent || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    gtag: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
  }
}
