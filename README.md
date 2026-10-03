# 🚀 TVSD Technologies - Next.js Enterprise Architecture

A scalable, configurable, enterprise-grade application built using **Next.js (App Router)**, **React 19**, **TypeScript**, **Material UI (MUI)**, **Zustand**, **TanStack Query**, and **SCSS**.

---

## 🗄 Database Configuration

* **Database Name**: `tvsd`
* **User**: `postgres`
* **Password**: `new password`
* **Host**: `localhost:5432`
* **Connection String**: `postgresql://postgres:new%20password@localhost:5432/tvsd?schema=public`

Configuration is managed in `.env` and `.env.example`.

---

## 📄 Application Pages

1. **Landing Page (`/`)**:
   - Modern enterprise showcase with hero presentation, live theme selectors, tech stack highlights, and quick access buttons.
2. **Login Portal (`/login`)**:
   - Authentication gateway featuring quick role presets (Super Admin, Administrator, Manager), credential input, session memory, and target database indicator (`tvsd`).
3. **Command Center Dashboard (`/dashboard`)**:
   - High-level KPIs, workforce analytics, industry vertical presets (ERP, CRM, Healthcare, Hospitality, HRMS, Logistics), and real-time layout / theme indicators.
4. **User Management (`/users`)**:
   - Full enterprise CRUD system:
     - **List**: Searchable, sortable table with avatar badges and role tags.
     - **Add**: Validated modal form powered by React Hook Form + Zod.
     - **Edit**: Live updates with TanStack Query cache invalidation.
     - **View**: Detailed employee credential & department card.
     - **Delete**: Instant deletion with toast notifications.

---

## 🎨 Dynamic Layout Engine (5 Layouts)

Switchable on the fly from the header or the **Platform Customizer** drawer:

* **Layout 1: Sidebar + Header** (Classic enterprise dashboard with collapsible rail)
* **Layout 2: Top Navigation** (Website-style horizontal mega-menu)
* **Layout 3: Mini Sidebar** (Compact icon rail for high data density)
* **Layout 4: Floating Dashboard** (Modern SaaS floating glass dock)
* **Layout 5: Hybrid Layout** (Top business domain ribbon + detailed left module rail)

---

## 🌈 Theme Engine (5 Themes)

Synchronized Material UI palettes and CSS Custom Properties:

1. **Corporate Light**
2. **Corporate Dark**
3. **Minimal**
4. **Healthcare Blue**
5. **Modern Gradient**

---

## 📁 Clean Project Structure

```text
tvsd-template/
├── src/
│   ├── app/                     # Pages (Landing, Login, Dashboard, Users)
│   │   ├── layout.tsx           # Global HTML layout with Poppins typography
│   │   ├── page.tsx             # Landing Page
│   │   ├── login/page.tsx       # Enterprise Login Portal
│   │   ├── dashboard/page.tsx   # Executive Command Center Dashboard
│   │   └── users/page.tsx       # User Management CRUD
│   │
│   ├── components/              # Reusable UI Wrappers & Navigation
│   │   ├── ui/                  # AppButton, AppInput, AppSelect, AppCard, AppModal, etc.
│   │   ├── navigation/          # Header, Sidebar, TopNav, MiniSidebar, FloatingNav, HybridNav
│   │   └── preferences/         # PreferencesDrawer (Live Layout & Theme customizer)
│   │
│   ├── layouts/                 # 5 Dynamic Layout Engines & LayoutEngine orchestrator
│   ├── themes/                  # 5 Theme definitions & CSS variable synchronizer
│   ├── api/                     # Centralized API client & User Service
│   ├── store/                   # Zustand Preferences & Auth state
│   ├── types/                   # TypeScript definitions
│   └── styles/                  # SCSS Architecture (globals, variables, mixins, responsive)
│
├── .env                         # Database credentials (tvsd / new password)
├── .env.example
├── package.json                 # Single clean package.json
└── README.md
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm start
```
