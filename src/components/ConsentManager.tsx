'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Checkbox } from './ui/Checkbox';
import { Label } from './ui/Label';

interface ConsentManagerProps {
  onConsentChange: (consent: ConsentState) => void;
}

interface ConsentState {
  analytics: boolean;
  ads: boolean;
  necessary: boolean;
}

export function ConsentManager({ onConsentChange }: ConsentManagerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    ads: false,
    necessary: true,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('bizcalculator-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
        onConsentChange(parsed);
      } catch (error) {
        console.error('Error parsing saved consent:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, [onConsentChange]);

  const handleConsentChange = (key: keyof ConsentState, value: boolean) => {
    const newConsent = { ...consent, [key]: value };
    setConsent(newConsent);
    onConsentChange(newConsent);
    localStorage.setItem('bizcalculator-consent', JSON.stringify(newConsent));
  };

  const acceptAll = () => {
    const newConsent = { analytics: true, ads: true, necessary: true };
    setConsent(newConsent);
    onConsentChange(newConsent);
    localStorage.setItem('bizcalculator-consent', JSON.stringify(newConsent));
    setShowBanner(false);
  };

  const acceptSelected = () => {
    onConsentChange(consent);
    localStorage.setItem('bizcalculator-consent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const rejectAll = () => {
    const newConsent = { analytics: false, ads: false, necessary: true };
    setConsent(newConsent);
    onConsentChange(newConsent);
    localStorage.setItem('bizcalculator-consent', JSON.stringify(newConsent));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cookie Consent</CardTitle>
          <CardDescription>
            We use cookies to improve your experience and analyze our traffic.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="necessary"
                checked={consent.necessary}
                disabled
                className="opacity-50"
              />
              <Label htmlFor="necessary" className="text-sm">
                Necessary cookies (required)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="analytics"
                checked={consent.analytics}
                onCheckedChange={(checked) => 
                  handleConsentChange('analytics', checked as boolean)
                }
              />
              <Label htmlFor="analytics" className="text-sm">
                Analytics cookies (Google Analytics)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ads"
                checked={consent.ads}
                onCheckedChange={(checked) => 
                  handleConsentChange('ads', checked as boolean)
                }
              />
              <Label htmlFor="ads" className="text-sm">
                Advertising cookies
              </Label>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button onClick={acceptAll} className="w-full">
              Accept All
            </Button>
            <Button onClick={acceptSelected} variant="outline" className="w-full">
              Accept Selected
            </Button>
            <Button onClick={rejectAll} variant="outline" className="w-full">
              Reject All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
