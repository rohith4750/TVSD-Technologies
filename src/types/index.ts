// Layout Engine Types
export type LayoutType = 'layout1' | 'layout2' | 'layout3' | 'layout4' | 'layout5';

export interface LayoutConfig {
  id: LayoutType;
  name: string;
  description: string;
  tag: string;
  badgeColor?: string;
}

// Theme Engine Types
export type ThemeType =
  | 'corporate-light'
  | 'corporate-dark'
  | 'minimal'
  | 'healthcare-blue'
  | 'modern-gradient';

export type ColorMode = 'light' | 'dark';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  mode: ColorMode;
  previewColors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
  };
}

// Industry Presets
export type IndustryPreset =
  | 'erp'
  | 'crm'
  | 'healthcare'
  | 'hotel'
  | 'hrms'
  | 'inventory';

export interface IndustryConfig {
  id: IndustryPreset;
  title: string;
  tagline: string;
  icon: string;
  accentColor: string;
}

// User & Preferences
export interface UserPreferences {
  userId: string | number;
  layout: LayoutType;
  theme: ThemeType;
  industry: IndustryPreset;
  sidebarCollapsed: boolean;
  density: 'compact' | 'standard' | 'spacious';
  notificationsEnabled: boolean;
  breadcrumbsVisible: boolean;
}

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'OPERATOR' | 'VIEWER';

export type Permission =
  | 'users.create'
  | 'users.read'
  | 'users.update'
  | 'users.delete'
  | 'products.create'
  | 'products.read'
  | 'products.update'
  | 'products.delete'
  | 'orders.create'
  | 'orders.read'
  | 'orders.update'
  | 'orders.delete'
  | 'inventory.manage'
  | 'billing.manage'
  | 'system.settings';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  permissions: Permission[];
  department?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
}

// Navigation Item
export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon: string;
  badge?: string | number;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  children?: NavigationItem[];
  industryFilter?: IndustryPreset[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

// Domain CRUD Models

// 1. Users
export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  department: string;
  phone: string;
  avatar: string;
  lastLogin: string;
  createdAt: string;
}

// 2. Products
export interface ProductRecord {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  minStockLevel: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED';
  rating: number;
  imageUrl?: string;
  createdAt: string;
}

// 3. Orders
export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  itemsCount: number;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
  fulfillmentStatus: 'DELIVERED' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';
  orderDate: string;
}

// 4. Customers
export interface CustomerRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  tier: 'ENTERPRISE' | 'PRO' | 'STANDARD' | 'LEAD';
  totalSpend: number;
  ordersCount: number;
  status: 'ACTIVE' | 'CHURNED' | 'PROSPECT';
  assignedAgent: string;
  lastContactDate: string;
}

// 5. Inventory
export interface InventoryRecord {
  id: string;
  itemCode: string;
  itemName: string;
  warehouseLocation: string;
  aisle: string;
  quantityOnHand: number;
  reservedQuantity: number;
  availableQuantity: number;
  unit: string;
  reorderPoint: number;
  status: 'OPTIMAL' | 'REORDER_NOW' | 'CRITICAL' | 'OVERSTOCKED';
  updatedAt: string;
}

// 6. Billing / Invoices
export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  total: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE' | 'DRAFT';
}

// 7. Virtual Audit Log (for 10K+ virtualized rows)
export interface AuditLogRecord {
  id: string;
  timestamp: string;
  actor: string;
  actorEmail: string;
  action: string;
  module: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  details: string;
}

// Table & Query Types
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  category?: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}
