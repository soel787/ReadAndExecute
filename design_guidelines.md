# GlowShop Design Guidelines

## Design Approach
**Reference-Based**: Modern e-commerce aesthetics inspired by premium fashion retailers, combined with glassmorphism design trend for a distinctive, contemporary feel.

## Core Aesthetic
**Glassmorphism with Pink Accent**
- Semi-transparent glass-like elements with backdrop blur effects
- Modern, clean, minimalist approach
- Smooth transitions and subtle animations throughout
- Premium feel appropriate for fashion retail

## Color Palette
- **Primary**: #ff69b4 (vibrant pink) - for CTAs, accents, highlights
- **Secondary**: #ff1493 (deep pink) - for hover states, secondary actions
- **Dark Theme** (default): Dark backgrounds (#0a0a0a to #1a1a1a), white text
- **Light Theme**: Light backgrounds (#f5f5f5 to #ffffff), dark text
- **Availability Indicators**: Green (#22c55e) for in-stock, Red (#ef4444) for out-of-stock

## Typography
- **Headings**: Modern sans-serif, weights 600-700, sizes ranging from 1.5rem (mobile) to 3rem (desktop)
- **Body**: Clean sans-serif, weight 400, 1rem base with 1.6 line-height
- **Product Prices**: Bold weight 700, larger size for emphasis (1.25rem)
- **CTAs**: Medium weight 500, uppercase for buttons

## Layout System
**Spacing**: Tailwind units of 2, 4, 6, and 8 for consistent rhythm (p-2, p-4, m-6, gap-8)

### Homepage Layout
- **Header**: Sticky navigation with theme toggle (moon/sun icon), logo, minimal menu
- **Hero Section**: Brief welcome message with delivery highlight, max 40vh height
- **Product Grid**: 
  - Mobile: Single column
  - Tablet: 2 columns (md:grid-cols-2)
  - Desktop: 3-4 columns (lg:grid-cols-3 xl:grid-cols-4)
  - Gap: gap-6 between cards
- **Footer**: Contact info, delivery info, social links

### Contacts Page
- **Two-column layout** (desktop): Contact info left, delivery details right
- **Single column** (mobile): Stacked sections
- Contact cards with glassmorphism styling

## Component Specifications

### Product Cards (Glassmorphism)
- Semi-transparent backdrop with blur effect
- Product image at top (4:5 aspect ratio)
- Availability badge: top-right corner, green/red pill shape
- Product name: centered, medium weight
- Price: prominent, bold, pink accent
- Description: muted text, 2-line truncation
- "Заказать" button: full-width, pink gradient, white text
- Hover: subtle lift effect (translateY: -4px), increased shadow

### Modal Order Window
- Dark overlay with backdrop blur
- Central glassmorphism card (max-width: 500px)
- Product image thumbnail
- Size selector: horizontal pill buttons (XS through 5XL)
- Telegram username input: no @ symbol, placeholder guidance
- Submit button: pink gradient, prominent
- Close button: top-right X icon

### Theme Toggle
- Floating position in header
- Icon transition: moon (dark) ↔ sun (light)
- Smooth rotation animation on switch
- Saves preference to localStorage

### Navigation
- **Desktop**: Horizontal, minimal links (Главная, Контакты)
- **Mobile**: Hamburger menu, slide-in drawer with glassmorphism

## Imagery Strategy
**Product Images**: 
- Primary content from Google Sheets URLs
- Consistent aspect ratios (4:5 portrait for clothing)
- Lazy loading for performance
- Fallback placeholder for missing images

**Hero Section**: 
- Optional: Subtle background pattern or gradient, NO large hero image
- Focus on clean typography and delivery message

## Animations
- **Minimal and purposeful only**
- Card hover: subtle lift + shadow increase
- Button hover: slight scale (1.02) + color shift
- Modal: fade-in overlay, scale-in content
- Theme toggle: icon rotation
- Page transitions: none (instant)

## Mobile Optimization
- Touch-friendly targets (min 44px height)
- Hamburger menu for navigation
- Single-column product grid
- Simplified spacing (reduce padding on mobile)
- Thumb-zone considerations for CTAs

## Accessibility
- High contrast between text and glassmorphism backgrounds
- Focus indicators on interactive elements
- ARIA labels for icon buttons
- Semantic HTML structure
- Keyboard navigation support

## Key Interactions
1. **Product Order Flow**: Click "Заказать" → Modal opens → Select size → Enter Telegram → Submit → Success notification
2. **Theme Switch**: Click moon/sun → Instant theme change → Icon animation
3. **Navigation**: Smooth scrolling to sections, instant page loads

## Technical Considerations
- All glassmorphism effects use backdrop-filter: blur()
- Ensure sufficient contrast on glass elements for readability
- Optimize blur effects for performance
- Test glass effects across browsers (fallbacks for non-supporting browsers)