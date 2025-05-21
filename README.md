# Ngọc Ánh - Minh Long Porcelain E-commerce

A modern e-commerce web application for Minh Long porcelain products, built with Next.js, React, and Tailwind CSS. The platform allows users to browse collections, view detailed product information, manage a shopping cart, register/login, and recover passwords. The UI is responsive and optimized for both desktop and mobile devices.


## Features

- **Product Catalog**: Browse a curated selection of Minh Long porcelain products with images, prices, and detailed descriptions.
- **Collections**: Explore themed collections with a carousel interface.
- **Search**: Quickly find products using the integrated search bar.
- **Shopping Cart**: Add products to your cart, view details, and proceed to checkout.
- **Authentication**: Register and log in using email or phone number. Password recovery is also supported.
- **Responsive Design**: Fully responsive layout for seamless experience on all devices.
- **Modern UI**: Built with Tailwind CSS and custom React components for a clean, elegant look.


## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) & Tailwind plugins
- [Radix UI](https://www.radix-ui.com/) components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Embla Carousel](https://www.embla-carousel.com/) for carousels
- [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)


## Project Structure

```
ngoc-anh/
├── src/
│   └── app/
│       ├── components/      # Reusable UI and page components
│       ├── ui/              # UI primitives (buttons, inputs, carousels, etc.)
│       ├── cart/            # Cart page and logic
│       ├── search/          # Search page and logic
│       ├── login/           # Login page and logic
│       ├── register/        # Registration page and logic
│       ├── password-recovery/ # Password recovery page
│       ├── products/        # Product detail pages
│       ├── storage.tsx      # Product and collection data
│       ├── page.tsx         # Main landing page
│       └── ...
├── public/                  # Static assets
├── package.json             # Project metadata and dependencies
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration
└── ...
```


## Getting Started

**1. Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```
**2. Run the development server:**
   ```bash
   yarn dev
   # or
   npm run dev
   ```
**3. Application urls:** 
   Open [http://localhost:3000](http://localhost:3000) in your browser (development mode).
   Open [https://ngoc-anh.vercel.app](https://ngoc-anh.vercel.app) in your browser (production mode).


## Customization

- Update product and collection data in `src/app/storage.tsx`.
- Adjust styles via Tailwind CSS and the `tailwind.config.js` file.


## License

This project is for demonstration and educational purposes. Minh Long branding and product data are used for illustrative purposes only.
