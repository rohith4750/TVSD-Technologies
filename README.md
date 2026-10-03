# 🚀 TVSD Technologies - Next.js Enterprise Monorepo Architecture

A scalable, configurable, enterprise-grade architecture built using **Next.js (App Router)**, **React 19**, **TypeScript**, **Material UI (MUI)**, **Zustand**, **TanStack Query**, **TanStack Virtual**, and **SCSS**.

The goal of this platform is to deploy multiple business applications (**ERP**, **CRM**, **Healthcare**, **Inventory**, **Hospitality / Hotel Management**, **HRMS**) from a single reusable platform without rebuilding common functionality.

---

## 🏗 Architecture & Clean Folder Structure

```text
tvsd-template/
├── src/
│   ├── api/                     # Centralized API layer & Services
│   │   ├── api.ts               # Core API client & services (Users, Products, Orders, etc.)
│   │   ├── apiurl.ts            # Centralized API endpoint constants
│   │   └── mockData.ts          # Realistic enterprise data & 2,500+ virtual audit logs
│   │
│   ├── app/                     # Next.js App Router (Pages & Routes)
│   │   ├── layout.tsx           # Global HTML layout with Poppins typography & providers
│   │   ├── page.tsx             # Command Center Dashboard with KPIs & preset switcher
│   │   ├── users/page.tsx       # User Management CRUD (List, Add, Edit, View, Delete)
│   │   ├── products/page.tsx    # Product Catalog CRUD (Standard & TanStack Virtual modes)
│   │   ├── orders/page.tsx      # Orders & Fulfillment Pipeline
│   │   ├── customers/page.tsx   # CRM & Enterprise Client Accounts
│   │   ├── inventory/page.tsx   # Warehouse Stock Control & Aisle Tracking
│   │   ├── billing/page.tsx     # Invoices & Financial Ledger
│   │   └── audit/page.tsx       # High-Performance TanStack Virtual Table (2,500+ rows)
│   │
│   ├── components/              # Reusable Enterprise Components
│   │   ├── ui/                  # Reusable wrappers around Material UI
│   │   │   ├── AppButton.tsx    # Standard, soft, and gradient variants with loading state
│   │   │   ├── AppInput.tsx     # Text input with icons and helper text
│   │   │   ├── AppSelect.tsx    # Dropdown select wrapper
│   │   │   ├── AppCard.tsx      # Elevated card with header & glassmorphism options
│   │   │   ├── AppModal.tsx     # Dialog modal with animated transitions
│   │   │   ├── AppStatusBadge.tsx # Semantic status pill indicators
│   │   │   ├── AppStatsCard.tsx # KPI metric cards with trends
│   │   │   ├── AppTable.tsx     # Enterprise data table with pagination, sorting & search
│   │   │   ├── AppVirtualTable.tsx # 60fps TanStack Virtual high-performance table
│   │   │   ├── AppBreadcrumbs.tsx # Dynamic route navigation breadcrumbs
│   │   │   ├── AppToast.tsx     # Toast notification manager
│   │   │   └── AppEmptyState.tsx # Clean feedback states
│   │   ├── navigation/          # Navigation components for all 5 layouts
│   │   │   ├── Header.tsx       # Enterprise header with theme/layout quick switchers
│   │   │   ├── Sidebar.tsx      # Collapsible dashboard sidebar
│   │   │   ├── TopNav.tsx       # Horizontal mega-menu
│   │   │   ├── MiniSidebar.tsx  # Compact icon rail for high data density
│   │   │   ├── FloatingNav.tsx  # Modern floating island dock
│   │   │   └── HybridNav.tsx    # Top business domain ribbon + detailed left module rail
│   │   └── preferences/
│   │       └── PreferencesDrawer.tsx # Live customizer for Layouts, Themes & Density
│   │
│   ├── layouts/                 # 5 Dynamic Layout Engines
│   │   ├── Layout1SidebarHeader.tsx    # Layout 1: Sidebar + Header (Enterprise)
│   │   ├── Layout2TopNav.tsx           # Layout 2: Top Navigation (Website/Portal)
│   │   ├── Layout3MiniSidebar.tsx      # Layout 3: Mini Sidebar (Compact rail)
│   │   ├── Layout4FloatingDashboard.tsx# Layout 4: Floating Dashboard (Modern SaaS)
│   │   ├── Layout5Hybrid.tsx           # Layout 5: Hybrid Navigation (Dual-level)
│   │   └── LayoutEngine.tsx            # Dynamic orchestrator switching layouts in real-time
│   │
│   ├── providers/
│   │   └── AppProviders.tsx     # MUI ThemeProvider, QueryClientProvider, CSS Variables
│   │
│   ├── store/
│   │   └── index.ts             # Zustand stores: Preferences, Auth, and Notifications
│   │
│   ├── styles/                  # Enterprise SCSS Architecture
│   │   ├── globals.scss         # Global styles & custom scrollbars
│   │   ├── variables.scss       # Breakpoints, dimensions, z-indices
│   │   ├── mixins.scss          # Glassmorphism, flex utilities
│   │   ├── responsive.scss      # Media queries (Mobile, Tablet, Laptop, Desktop)
│   │   ├── typography.scss      # Poppins typography tokens
│   │   └── themes.scss          # CSS Custom Properties for all 5 themes
│   │
│   ├── themes/
│   │   └── index.ts             # 5 Dynamic MUI themes & CSS variable synchronizer
│   │
│   └── types/
│       └── index.ts             # Unified TypeScript definitions
│
├── package.json                 # Single root package.json
├── tsconfig.json                # TypeScript configuration
├── next.config.mjs              # Next.js configuration with SCSS paths
└── README.md
```

---

## 🎨 Dynamic Layout Engine (5 Layouts)

Users can toggle layouts in real time without refreshing or rewriting business code:

1. **Layout 1: Sidebar + Header**: Classic enterprise command center with collapsible sidebar and search header.
2. **Layout 2: Top Navigation**: Horizontal navbar layout for web apps, portals, and executive consoles.
3. **Layout 3: Mini Sidebar**: Compact icon-only rail for data-dense tables, virtualized views, and audits.
4. **Layout 4: Floating Dashboard**: Modern SaaS aesthetic with a floating glass island dock and elevated panels.
5. **Layout 5: Hybrid Layout**: Dual navigation with top business domain switchers (ERP, CRM, HRMS) and nested sidebar modules.

---

## 🌈 Theme Engine (5 Enterprise Themes)

Every layout seamlessly supports all 5 themes with synchronized Material UI theme palettes and CSS custom properties:

1. **Corporate Light**: Crisp enterprise slate and royal navy blue with clean elevation.
2. **Corporate Dark**: Deep midnight obsidian with vivid cyan highlights and reduced eye fatigue.
3. **Minimal**: Stark monochrome precision with high-contrast typography and understated luxury.
4. **Healthcare Blue**: Sterile clinical cyan and calming medical mint tailored for health and life sciences.
5. **Modern Gradient**: Electric violet and fuchsia gradient with glowing glassmorphism accents.

---

## ⚡ High-Performance Virtualization (TanStack Virtual)

To avoid DOM bloat when rendering thousands of records:
- **`AppVirtualTable`** renders only visible rows (~12–15 nodes) on screen while scrolling smoothly at 60 FPS through 2,500+ records.
- Demonstrated on both **Product Catalog** and **Audit Logs Vault** (`/audit`).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```
