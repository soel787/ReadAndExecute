# GlowShop - E-commerce Clothing Store

## Overview

GlowShop is a modern e-commerce platform for a clothing store based in Ulan-Ude, Russia. The application features a glassmorphism-inspired design with dark/light theme support, real-time product catalog integration via Google Sheets, and order processing through Telegram notifications. The platform is built as a full-stack TypeScript application with Express backend and React frontend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server with HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query (React Query)** for server state management and data fetching with automatic caching

**UI Component System**
- **Shadcn UI** component library built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Class Variance Authority (CVA)** for type-safe component variant management
- **Glassmorphism Design Pattern**: Semi-transparent cards with backdrop-blur effects for a modern aesthetic

**State Management Strategy**
- Server state managed by TanStack Query (products, orders)
- Local UI state managed by React hooks (theme, modal visibility, form state)
- Theme persistence via localStorage with context API

**Design System**
- Primary color: Pink (#ff69b4) for CTAs and accents
- Dark theme as default with light theme toggle
- Responsive grid layouts (1 column mobile → 2-3 columns tablet → 3-4 columns desktop)
- Custom font stack: Inter for body, Montserrat for headings

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- **HTTP Server** created via Node's native `http` module
- Development mode uses Vite middleware for SSR and HMR
- Production mode serves static files from pre-built dist directory

**API Design Pattern**
- RESTful API endpoints under `/api` prefix
- Endpoints:
  - `GET /api/products` - Fetches product catalog
  - `POST /api/order` - Submits new orders
- Request/response format: JSON
- Input validation using Zod schemas

**Data Flow**
1. Products fetched from Google Sheets CSV export every request (with 5-minute in-memory cache)
2. CSV parsed on server to Product objects
3. Orders validated against schema then sent to Telegram
4. No persistent database for orders (Telegram serves as notification system)

### External Dependencies

**Google Sheets Integration**
- **Purpose**: Product catalog management (single source of truth for inventory)
- **Access Method**: Public CSV export URL
- **Data Format**: CSV with columns: name, price, description, imageUrl, inStock (да/нет)
- **Caching**: 5-minute in-memory cache to reduce API calls
- **Parsing**: Custom CSV parser handling quoted fields and commas

**Telegram Bot API**
- **Purpose**: Order notification system
- **Bot Token**: Hardcoded in server/routes.ts (should be moved to environment variables)
- **Target Chat ID**: 1350599664 (shop owner)
- **Message Format**: Formatted text with product details, size, customer username
- **API Endpoint**: `https://api.telegram.org/bot{token}/sendMessage`

**Database Configuration**
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Provider**: Neon Database (serverless Postgres)
- **Current Status**: Schema defined but not actively used (storage uses in-memory cache)
- **Schema Location**: `shared/schema.ts` defines Product and Order types
- **Migration Path**: Configured but orders currently bypass database

**Third-Party UI Libraries**
- **Radix UI**: Headless accessible component primitives (20+ components imported)
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icons (specifically SiTelegram for brand icons)
- **Embla Carousel**: Carousel component (imported but may not be actively used)

**Development Tools**
- **ESBuild**: For production server bundling
- **TypeScript**: Strict type checking across codebase
- **Replit Plugins**: Development banner, cartographer, runtime error overlay (dev only)

**Session Management**
- **Connect-pg-simple**: PostgreSQL session store (configured but sessions may not be actively used)
- **Express-session**: Not visible in current implementation

### Key Architectural Decisions

**Product Data Source: Google Sheets**
- **Rationale**: Non-technical store owner can easily update inventory without code changes
- **Trade-off**: No database validation, requires internet access, potential for malformed data
- **Alternative Considered**: PostgreSQL database with admin panel (rejected for complexity)

**Order Processing: Telegram-Only**
- **Rationale**: Store owner already uses Telegram for business communication
- **Trade-off**: No order history, no automated fulfillment tracking
- **Alternative Considered**: Email notifications (rejected as owner prefers Telegram)

**No Authentication System**
- **Rationale**: Public product catalog, orders processed via Telegram username verification
- **Trade-off**: No customer accounts, order history, or saved addresses
- **Security Note**: Relies on Telegram username as identifier (can be spoofed)

**In-Memory Caching**
- **Rationale**: Reduces Google Sheets API calls, improves response times
- **Trade-off**: Cache invalidation only by time, not by actual data changes
- **Alternative Considered**: Redis (rejected for deployment complexity on PythonAnywhere)

**Vite for Development, ESBuild for Production**
- **Rationale**: Vite provides excellent DX with HMR, ESBuild creates optimized single-file server bundle
- **Trade-off**: Different build tools require maintenance of both configurations
- **Benefit**: Fast cold starts in production, dependency bundling reduces syscalls

**Monorepo Structure**
- **Shared Types**: `shared/schema.ts` contains Zod schemas used by both client and server
- **Path Aliases**: `@/` for client, `@shared/` for shared code
- **Build Process**: Client built to `dist/public`, server to `dist/index.cjs`