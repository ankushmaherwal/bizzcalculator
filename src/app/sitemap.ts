import { MetadataRoute } from 'next';
import { CALCULATOR_PAGES } from '@/constants/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bizcalculator.com';
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  const calculatorPages = CALCULATOR_PAGES.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...calculatorPages];
}

