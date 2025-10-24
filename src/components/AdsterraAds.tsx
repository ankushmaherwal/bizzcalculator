'use client';

import Script from 'next/script';

interface AdsterraAdsProps {
  consent: boolean;
}

export function AdsterraAds({ consent }: AdsterraAdsProps) {
  if (!consent) return null;

  return (
    <>
      <Script
        id="adsterra-config"
        dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key': '6cb2db769ea45b55473961cb9d425c80',
              'format': 'iframe',
              'height': 90,
              'width': 728,
              'params': {}
            };
          `,
        }}
      />
      <Script
        src="//www.highperformanceformat.com/6cb2db769ea45b55473961cb9d425c80/invoke.js"
        strategy="afterInteractive"
      />
    </>
  );
}
