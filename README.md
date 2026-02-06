# Expert Listing - PropTech Dashboard

A modern, responsive property technology dashboard application built with Next.js 16, React 19, and Tailwind CSS 4. This assessment project demonstrates high-quality code implementation following industry best practices and modern web development standards.

## 🎨 Design

The UI design is based on the following Figma specification:
[Figma Design](https://www.figma.com/design/4r4lQKWCS69Z22b8hKnwRA/Recruitment?node-id=26-12923&t=yRPnIf5RUQ2isDrD-0)

## ✨ Features

### Dashboard Overview
- **Sales Overview**: Interactive bar charts with time-range filtering (1 Week, 1 Month, 1 Year) and key metrics display
- **Listings Overview**: Quick stats for total, active, and archived listings
- **Users Overview**: User metrics including total users, riders, and subscribers
- **Property Carousels**: Three auto-playing image carousels showcasing "Most Clicked", "Most WatchListed", and "Hottest Listing" properties with smooth animations

### Interactive Components
- **Budgeting Dialog**: Modal dialog for budget creation with feature highlights and toast notifications
- **Calendar Sheet**: Custom calendar component with date selection, month navigation, and toast feedback
- **Responsive Navigation**: Animated header with active state indicators and mobile-friendly menu

## 🛠️ Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion (Motion) 12.31.1
- **Charts**: Recharts 2.15.4
- **UI Components**: Radix UI primitives
- **Date Handling**: date-fns 4.1.0, react-day-picker 9.13.0
- **Notifications**: Sonner 2.0.7
- **Type Safety**: TypeScript 5

## 🏗️ Architecture & Code Quality

This project demonstrates:

- **Component-Based Architecture**: Modular, reusable components with clear separation of concerns
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Animation Patterns**: Centralized animation variants in `lib/animations.ts` for reusability
- **Responsive Design**: Mobile-first approach with breakpoint-optimized layouts
- **Accessibility**: ARIA labels, semantic HTML, and screen reader support
- **Performance**: Optimized images with Next.js Image component, code splitting, and efficient re-renders
- **Modern Patterns**: React Server Components, client components where needed, and proper state management

## 📁 Project Structure

```
app/
  (dashboard)/          # Dashboard routes
    page.tsx            # Main dashboard with overview cards and carousels
components/
  ui/                   # Reusable UI components (shadcn-based)
  sales-overview.tsx    # Sales metrics and charts
  listings-overview.tsx # Listings statistics
  users-overview.tsx    # User metrics
  property-carousel.tsx # Individual carousel component
  budgeting-dialog.tsx  # Budget creation modal
  calendar-sheet.tsx    # Calendar side panel
lib/
  animations.ts         # Centralized Framer Motion variants
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Code Standards

This project adheres to:
- **ESLint** configuration for code quality
- **TypeScript** strict mode for type safety
- **Consistent naming conventions** and file organization
- **Reusable animation patterns** and component abstractions
- **Responsive design principles** with mobile-first approach
- **Accessibility best practices** (WCAG guidelines)

## 🎯 Key Highlights

- Pixel-perfect implementation matching the Figma design specifications
- Smooth animations and transitions throughout the application
- Fully responsive layout that works seamlessly across all device sizes
- Clean, maintainable codebase with proper TypeScript typing
- Optimized performance with Next.js best practices
- Accessible UI components following modern web standards

---

Built as an assessment project demonstrating proficiency in modern React/Next.js development, TypeScript, and UI/UX implementation.
