# Thạch Âm - Premium Porcelain E-commerce

A modern, full-featured e-commerce web application for premium porcelain products, built with Next.js, React, and Tailwind CSS. The platform offers an elegant shopping experience with curated collections, detailed product information, and seamless user interactions.

## Features

- **Product Catalog**: Browse premium porcelain products with high-quality images and detailed descriptions
- **Collections**: Explore themed product collections with an engaging carousel interface
- **Advanced Search**: Find products quickly with real-time filtering
- **Shopping Cart**: Manage cart items and checkout seamlessly
- **Authentication**: Secure login/register with email or phone, including password recovery
- **Responsive Design**: Optimized for all devices
- **Modern UI/UX**: Built with Tailwind CSS and Radix UI
- **Animations**: Smooth transitions with Framer Motion and GSAP

## Tech Stack

- **Framework**: Next.js 15.3.1 (App Router, TypeScript)
- **Frontend**: React 19.0.0
- **Styling**: Tailwind CSS 4 with plugins (line-clamp, animate, autofill)
- **UI Components**:
  - Radix UI (Label, Scroll Area, Select, Separator, Switch, Tooltip)
  - Headless UI
  - Lucide React
  - React Icons
- **Carousel**: Embla Carousel
- **Animations**: Framer Motion, GSAP
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**:
  - clsx
  - class-variance-authority
  - tailwind-merge
  - next-themes
  - sonner (toasts)

## Project Structure

```
thach-am/
├── src/
│   ├── app/                 # App router pages and layouts
│   │   ├── (auth)/         # Authentication routes
│   │   ├── cart/           # Cart functionality
│   │   ├── more/           # Additional pages
│   │   ├── products/       # Product pages
│   │   ├── search/         # Search functionality
│   │   ├── components.json # UI components config
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── schemas.ts      # Zod validation schemas
│   │   ├── storage.tsx     # Product data
│   │   └── types.ts        # TypeScript types
│   ├── components/         # Shared components
│   ├── config/            # App configuration
│   ├── constants/         # App constants
│   ├── hooks/            # Custom React hooks
│   ├── libs/             # Utility libraries
│   └── modules/          # Feature modules
├── public/               # Static assets
├── .vscode/             # VS Code settings
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind config
├── next.config.ts       # Next.js config
└── tsconfig.json        # TypeScript config
```

## Getting Started

1. **Install dependencies:**

   ```bash
   yarn install
   # or
   npm install
   ```

2. **Run the development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

3. **Open the app:**
   - Development: [http://localhost:3000](http://localhost:3000)
   - Production: [https://thacham.vercel.app](https://thacham.vercel.app)

## Development Guidelines

1. Create feature branches from `main`
2. Follow TypeScript and React best practices
3. Write clear commit messages
4. Test changes locally
5. Submit PRs with detailed descriptions
6. Use Prettier for code formatting
7. Follow the established project structure

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
