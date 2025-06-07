# Ngọc Ánh - Minh Long Porcelain E-commerce

A modern, full-featured e-commerce web application for Minh Long porcelain products, built with Next.js, React, and Tailwind CSS. The platform enables users to browse curated collections, view detailed product information, manage a shopping cart, register/login, and recover passwords. The UI is responsive, elegant, and optimized for both desktop and mobile devices.

---

## Features

- **Product Catalog**: Browse a curated selection of Minh Long porcelain products with high-quality images, prices, and detailed descriptions.
- **Collections**: Explore themed product collections with a visually engaging carousel interface.
- **Advanced Search**: Quickly find products using a robust, integrated search bar with real-time filtering.
- **Shopping Cart**: Add products to your cart, view details, adjust quantities, and proceed to checkout with a seamless experience.
- **Authentication**: Register and log in using email or phone number. Password recovery is supported for both methods.
- **Responsive Design**: Fully responsive layout for a seamless experience on all devices, including mobile and desktop.
- **Modern UI/UX**: Built with Tailwind CSS, Radix UI, and custom React components for a clean, elegant, and accessible interface.
- **Animations**: Smooth transitions and interactive elements powered by Framer Motion.
- **Extensible Architecture**: Modular components, hooks, and utilities for easy customization and scalability.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with plugins (`@tailwindcss/line-clamp`, `tailwindcss-animate`)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Utilities**: `clsx`, `class-variance-authority`, `tailwind-merge`, `next-themes`, and more

---

## Project Structure

```
ngoc-anh/
├── src/
│   └── app/
│       ├── components/      # Reusable UI and page components (cart, product, header, footer, etc.)
│       ├── ui/              # UI primitives (buttons, inputs, carousels, tooltips, etc.)
│       ├── hooks/           # Custom React hooks (cart context, mobile detection, etc.)
│       ├── lib/             # Utility functions and helpers
│       ├── cart/            # Cart page and logic
│       ├── search/          # Search page and logic
│       ├── login/           # Login page and logic
│       ├── register/        # Registration page and logic
│       ├── password-recovery/ # Password recovery page and logic
│       ├── products/        # Product detail pages (dynamic routing)
│       ├── storage.tsx      # Product and collection data (customizable)
│       ├── page.tsx         # Main landing page
│       ├── layout.tsx       # App layout and global wrappers
│       └── globals.css      # Global styles
├── public/                  # Static assets (images, favicon, etc.)
├── package.json             # Project metadata and dependencies
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration (image domains, etc.)
├── tsconfig.json            # TypeScript configuration
└── ...
```

---

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
   - Production: [https://ngoc-anh.vercel.app](https://ngoc-anh.vercel.app)

---

## Customization & Extensibility

- **Product & Collection Data:**
  - Update or extend product and collection data in `src/app/storage.tsx`.
- **UI & Theme:**
  - Adjust styles via Tailwind CSS and `tailwind.config.js`.
  - Customize or extend UI primitives in `src/app/ui/` and components in `src/app/components/`.
- **Add Features:**
  - Add new pages or features by creating new folders/files in `src/app/` following the Next.js App Router conventions.
- **Image Domains:**
  - To allow images from new domains, update the `images.remotePatterns` array in `next.config.ts`.

---

## Contribution Guidelines

1. Fork the repository and create a new branch for your feature or fix.
2. Follow the existing code style and structure.
3. Add clear, descriptive commit messages.
4. Test your changes locally before submitting a pull request.
5. Open a pull request with a detailed description of your changes.

---

## License

This project is for demonstration and educational purposes. Minh Long branding and product data are used for illustrative purposes only.
