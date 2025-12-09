

# 🛒 Profein Store – Modern E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://profein-store.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/deployed-vercel-black)](https://vercel.com)

**Profein Store** is a cutting-edge, full-stack e-commerce application for premium fitness equipment and accessories. Built with **Next.js 16** (App Router), **Framer Motion**, and **Strapi CMS**, it features stunning animations, seamless user experience, and modern web technologies. The application showcases advanced UI/UX patterns including 3D transforms, magnetic hover effects, and scroll-triggered animations.

🔗 **[Live Demo](https://profein-store.vercel.app/)** | 📧 **[Contact](mailto:umernvd03@gmail.com)**

---

## ✨ Key Features

### 🎨 Advanced UI/UX
* **Product Card Animations**: Hover effects with lift (-8px), image zoom (1.1x), and gradient overlays
* **Staggered Entry Animations**: Products fade in sequentially with 0.1s delays
* **Button Micro-interactions**: Scale transformations (1.05x hover, 0.95x tap) with sliding backgrounds
* **Skeleton Loaders**: Shimmer effect during content loading for smooth UX
* **Science Gothic Font**: Modern, geometric typography for tech-forward aesthetic

### 🎭 About Page Showcase
* **Character-by-Character Text Reveal**: Spring physics-based letter animations
* **Animated Stats Counters**: Numbers count up smoothly on scroll into view
* **3D Flip Cards**: Mission cards rotate 180° on hover with backface rendering
* **Morphing SVG Blobs**: Continuously animated background shapes with path transformations
* **Magnetic Hover Effects**: Cards follow mouse movement with 3D perspective transforms
* **Scroll-Triggered Timeline**: Journey milestones reveal with animated connecting paths
* **Glassmorphism Design**: Frosted glass effect cards with gradient borders

### 🛒 E-Commerce Functionality
* **Shopping Cart System**: Context-based cart management with persistent state
* **Toast Notifications**: Real-time feedback for user actions
* **Product Filtering**: Dynamic category and search filtering
* **Checkout Flow**: Multi-step checkout with shipping, billing, and payment forms
* **Fallback Mode**: Works seamlessly even when backend is unavailable
* **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🚀 Performance & SEO
* **Server-Side Rendering**: Next.js App Router for optimal SEO
* **Turbopack**: Lightning-fast development with Next.js 16
* **Image Optimization**: Next.js Image component for lazy loading
* **Code Splitting**: Automatic route-based splitting for faster loads

---

## 🛠️ Tech Stack

### Frontend
* **[Next.js 16.0.7](https://nextjs.org/)** - React framework with App Router and Turbopack
* **[React 19.0.0](https://react.dev/)** - Latest React with concurrent features
* **[Framer Motion 12.12.1](https://www.framer.com/motion/)** - Production-ready animation library
* **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
* **[Science Gothic](https://fonts.google.com/specimen/Science+Gothic)** - Variable font (100-900 weights)

### Backend
* **[Node.js](https://nodejs.org/)** - JavaScript runtime
* **[Strapi CMS](https://strapi.io/)** - Headless CMS for content management
* **REST API** - RESTful endpoints for data fetching

### Deployment & Tools
* **[Vercel](https://vercel.com/)** - Deployment platform with automatic CI/CD
* **[Git & GitHub](https://github.com/)** - Version control and collaboration
* **ESLint** - Code linting and quality assurance

---

## 📦 Getting Started

### Prerequisites

* **Node.js** (v18 or higher)
* **npm** or **yarn** package manager
* **Git** for version control
* **Strapi backend** (optional - app works with fallback data)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/umernvd/Profein-Store.git
   cd Profein-Store
   ```

2. **Install frontend dependencies**:
   ```bash
   cd gym-store
   npm install
   ```

3. **Install backend dependencies** (optional):
   ```bash
   cd ../gym-store-backend
   npm install
   ```

4. **Set up environment variables**:
   
   Create `.env.local` in the `gym-store` directory:
   ```env
   # Strapi Backend URL (optional - fallback mode available)
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   
   # Additional environment variables
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Run the development servers**:
   
   **Frontend** (required):
   ```bash
   cd gym-store
   npm run dev
   ```
   
   **Backend** (optional):
   ```bash
   cd gym-store-backend
   npm run develop
   ```

6. **Access the application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend Admin: [http://localhost:1337/admin](http://localhost:1337/admin) (if running)

---

## 📁 Project Structure

```bash
Profein-Store/
├── gym-store/                      # Frontend Next.js application
│   ├── public/
│   │   └── images/                 # Static images and assets
│   ├── src/
│   │   ├── app/                    # Next.js App Router pages
│   │   │   ├── about/             # About page with animations
│   │   │   ├── admin/             # Admin dashboard pages
│   │   │   ├── cart/              # Shopping cart page
│   │   │   ├── checkout/          # Checkout flow pages
│   │   │   ├── products/          # Products listing page
│   │   │   ├── globals.css        # Global styles and animations
│   │   │   ├── layout.js          # Root layout with providers
│   │   │   └── page.js            # Home page
│   │   ├── components/            # Reusable React components
│   │   │   ├── Navbar.js          # Navigation with glassmorphism
│   │   │   ├── Footer.js          # Site footer
│   │   │   ├── SkeletonLoader.js  # Loading placeholders
│   │   │   ├── ErrorBoundary.js   # Error handling
│   │   │   └── PageTransition.js  # Route transition animations
│   │   ├── context/               # React Context providers
│   │   │   ├── CartContext.js     # Shopping cart state
│   │   │   ├── OrderContext.js    # Order management
│   │   │   └── ToastContext.js    # Toast notifications
│   │   └── lib/
│   │       └── api.js             # API utilities & fallback data
│   ├── .gitignore                 # Git ignore rules
│   ├── next.config.mjs            # Next.js configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   ├── postcss.config.mjs         # PostCSS configuration
│   └── package.json               # Frontend dependencies
│
├── gym-store-backend/             # Strapi CMS backend
│   ├── config/                    # Strapi configurations
│   ├── database/                  # Database migrations
│   ├── public/                    # Uploaded files
│   ├── src/
│   │   ├── api/                   # API endpoints
│   │   │   ├── category/         # Category content type
│   │   │   └── product/          # Product content type
│   │   └── index.js              # Entry point
│   └── package.json               # Backend dependencies
│
└── README.md                      # This file
```

---

## 🎯 Available Scripts

### Frontend (gym-store)
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
```

### Backend (gym-store-backend)
```bash
npm run develop      # Start Strapi in development mode
npm run start        # Start Strapi in production mode
npm run build        # Build admin panel
npm run strapi       # Strapi CLI commands
```

---

## 🌐 Deployment

### Vercel (Frontend)

The frontend is automatically deployed to Vercel on every push to the `main` branch.

**Manual Deployment:**
```bash
npm install -g vercel
cd gym-store
vercel --prod
```

### Environment Variables on Vercel
Set these in your Vercel project settings:
* `NEXT_PUBLIC_STRAPI_API_URL` - Your Strapi backend URL
* `NEXT_PUBLIC_APP_URL` - Your frontend URL

---

## 🎨 Key Technologies Explained

### Framer Motion Animations
The app uses Framer Motion's full API suite:
* `motion` components for animated elements
* `useScroll`, `useTransform` for scroll-based animations
* `useSpring` for physics-based motion
* `useInView` for scroll-triggered reveals
* `useMotionValue` for mouse tracking
* `AnimatePresence` for exit animations

### Next.js App Router
* File-based routing with `app/` directory
* Server and Client Components
* Streaming with Suspense
* Built-in Image Optimization
* Font Optimization with Google Fonts

### Tailwind CSS 4
* Utility-first CSS framework
* Custom animations with `@keyframes`
* JIT (Just-In-Time) compilation
* Custom color palette for brand consistency

---

## 🚧 Development Notes

### Fallback Mode
The application includes a fallback product array that activates when the Strapi backend is unavailable. This ensures the frontend remains functional during development or backend maintenance.

### Cache Management
Next.js caches are stored in `.next/` directory. Clear cache if experiencing issues:
```bash
Remove-Item -Path ".next" -Recurse -Force  # PowerShell
rm -rf .next                                # Bash
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Umer Naveed**  
Software Engineer | Full-Stack Developer

* 🌐 Portfolio: [umer-naveed.vercel.app](https://umer-naveed.vercel.app/)
* 💼 LinkedIn: [linkedin.com/in/umer-naveed](https://www.linkedin.com/in/umer-naveed)
* 🐙 GitHub: [github.com/umernvd](https://github.com/umernvd)
* 📧 Email: umernvd03@gmail.com

---

## 🙏 Acknowledgments

* **Next.js Team** - For the amazing React framework
* **Framer** - For the powerful animation library
* **Vercel** - For seamless deployment platform
* **Strapi** - For the flexible headless CMS
* **Google Fonts** - For Science Gothic typography

---

## 📊 Project Stats

* **Total Commits**: 50+
* **Lines of Code**: 5,000+
* **Components**: 15+
* **Pages**: 10+
* **Animations**: 25+ unique effects

---

Made with ❤️ by [Umer Naveed](https://github.com/umernvd)
