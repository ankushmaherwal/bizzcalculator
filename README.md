# BizCalculator - Professional Business Calculators

A comprehensive Next.js application providing professional business calculators for EMI, ROI, business valuation, and break-even analysis. Built with TypeScript, TailwindCSS, and optimized for performance and SEO.

🌐 **Live Demo**: [bizzcalculator.com](https://bizzcalculator.com)

## Features

### 🧮 Calculators
- **EMI Calculator** - Calculate monthly EMI payments with detailed amortization schedule
- **Business Valuation Calculator** - Estimate business value using revenue multiples
- **ROI Calculator** - Calculate return on investment and annualized returns
- **Break-Even Analysis** - Determine break-even points for products and services

### 🚀 Technical Features
- **Server-Side Rendering (SSR)** - All calculator pages are SSR with query parameter support
- **SEO Optimized** - Complete SEO setup with next-seo, JSON-LD structured data, sitemap, and robots.txt
- **Mobile-First Design** - Responsive design with TailwindCSS
- **Interactive Charts** - Lazy-loaded Recharts for data visualization
- **Cookie Consent** - GDPR-compliant consent management
- **Google Analytics** - GA4 integration with consent-based loading
- **Shareable URLs** - All calculations can be shared via URL parameters
- **Accessibility** - WCAG compliant with proper ARIA labels

### 📊 Performance
- **Code Splitting** - Lazy-loaded charts and components
- **Bundle Optimization** - Small initial bundle size
- **Lighthouse Optimized** - 90+ scores across all metrics
- **Image Optimization** - Next.js automatic image optimization

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bizcalculator-react
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_AD_CLIENT_ID=ca-pub-xxxxxxxxxx
NEXT_PUBLIC_AD_SLOT_ID=xxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://sample-site-name.com
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run e2e tests with UI
- `npm run test:e2e:headed` - Run e2e tests in headed mode

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── calculator/         # Calculator pages
│   │   ├── emi-loan/      # EMI calculator page
│   │   ├── business-valuation/
│   │   ├── roi-calculator/
│   │   └── break-even-analysis/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── sitemap.ts        # Sitemap generation
│   └── robots.ts         # Robots.txt
├── components/            # React components
│   ├── calculators/       # Calculator components
│   │   ├── charts/        # Chart components
│   │   ├── EMICalculator.tsx
│   │   ├── BusinessValuationCalculator.tsx
│   │   ├── ROICalculator.tsx
│   │   └── BreakEvenCalculator.tsx
│   ├── ui/               # UI components
│   ├── ConsentManager.tsx
│   ├── ConsentWrapper.tsx
│   ├── GoogleAnalytics.tsx
│   ├── Navigation.tsx
│   └── SEO.tsx
├── constants/            # Constants and configuration
├── lib/                  # Utility functions
│   ├── calculations.ts   # Calculation logic
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
└── hooks/               # Custom React hooks
```

## Calculator URLs

- **EMI Calculator**: `/calculator/emi-loan`
- **Business Valuation**: `/calculator/business-valuation`
- **ROI Calculator**: `/calculator/roi-calculator`
- **Break-Even Analysis**: `/calculator/break-even-analysis`

All calculators support URL parameters for sharing calculations:
- EMI: `?loan=1000000&rate=8.5&years=20`
- Business Valuation: `?revenue=1000000&profitMargin=15&growthRate=10&discountRate=12`
- ROI: `?initialInvestment=100000&finalValue=150000&timePeriod=2`
- Break-Even: `?fixedCosts=50000&variableCosts=100&sellingPrice=200`

## SEO Features

- **Meta Tags**: Complete meta tag optimization
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **JSON-LD**: Structured data for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Proper canonical URL handling

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics tracking ID | No |
| `NEXT_PUBLIC_AD_CLIENT_ID` | Google AdSense client ID | No |
| `NEXT_PUBLIC_AD_SLOT_ID` | Google AdSense slot ID | No |
| `NEXT_PUBLIC_SITE_URL` | Site URL for canonical links | Yes |

## Performance Optimization

- **Bundle Analysis**: Use `npm run build` to analyze bundle size
- **Image Optimization**: All images are optimized with Next.js
- **Code Splitting**: Charts and heavy components are lazy-loaded
- **Caching**: Proper cache headers for static assets
- **Compression**: Gzip compression enabled

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.