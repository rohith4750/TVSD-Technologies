import {
  AuditLogRecord,
  CustomerRecord,
  InventoryRecord,
  InvoiceRecord,
  OrderRecord,
  ProductRecord,
  UserRecord
} from '@/types';
import {
  INITIAL_CUSTOMERS,
  INITIAL_INVENTORY,
  INITIAL_INVOICES,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_USERS,
  generateVirtualAuditLogs
} from './mockData';

// In-memory data store for live CRUD manipulation during session
let users = [...INITIAL_USERS];
let products = [...INITIAL_PRODUCTS];
let orders = [...INITIAL_ORDERS];
let customers = [...INITIAL_CUSTOMERS];
let inventory = [...INITIAL_INVENTORY];
let invoices = [...INITIAL_INVOICES];
let auditLogs = generateVirtualAuditLogs(2500);

const delay = (ms: number = 200) => new Promise((resolve) => setTimeout(resolve, ms));

// Users Service
export const userService = {
  async getAll(): Promise<UserRecord[]> {
    await delay(150);
    return [...users];
  },

  async getById(id: string): Promise<UserRecord | undefined> {
    await delay(100);
    return users.find((u) => u.id === id);
  },

  async create(user: Omit<UserRecord, 'id' | 'createdAt' | 'lastLogin'>): Promise<UserRecord> {
    await delay(250);
    const newUser: UserRecord = {
      ...user,
      id: `usr-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    users = [newUser, ...users];
    return newUser;
  },

  async update(id: string, updates: Partial<UserRecord>): Promise<UserRecord> {
    await delay(200);
    users = users.map((u) => (u.id === id ? { ...u, ...updates } : u));
    const updated = users.find((u) => u.id === id);
    if (!updated) throw new Error('User not found');
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await delay(200);
    users = users.filter((u) => u.id !== id);
    return true;
  },
};

// Products Service
export const productService = {
  async getAll(): Promise<ProductRecord[]> {
    await delay(150);
    return [...products];
  },

  async getById(id: string): Promise<ProductRecord | undefined> {
    await delay(100);
    return products.find((p) => p.id === id);
  },

  async create(prod: Omit<ProductRecord, 'id' | 'createdAt'>): Promise<ProductRecord> {
    await delay(250);
    const newProd: ProductRecord = {
      ...prod,
      id: `prod-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    products = [newProd, ...products];
    return newProd;
  },

  async update(id: string, updates: Partial<ProductRecord>): Promise<ProductRecord> {
    await delay(200);
    products = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    const updated = products.find((p) => p.id === id);
    if (!updated) throw new Error('Product not found');
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await delay(200);
    products = products.filter((p) => p.id !== id);
    return true;
  },
};

// Orders Service
export const orderService = {
  async getAll(): Promise<OrderRecord[]> {
    await delay(150);
    return [...orders];
  },

  async updateStatus(
    id: string,
    fulfillmentStatus: OrderRecord['fulfillmentStatus'],
    paymentStatus?: OrderRecord['paymentStatus']
  ): Promise<OrderRecord> {
    await delay(180);
    orders = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            fulfillmentStatus,
            ...(paymentStatus ? { paymentStatus } : {}),
          }
        : o
    );
    const updated = orders.find((o) => o.id === id);
    if (!updated) throw new Error('Order not found');
    return updated;
  },
};

// Customers Service
export const customerService = {
  async getAll(): Promise<CustomerRecord[]> {
    await delay(150);
    return [...customers];
  },

  async create(customer: Omit<CustomerRecord, 'id'>): Promise<CustomerRecord> {
    await delay(200);
    const newCust: CustomerRecord = {
      ...customer,
      id: `cust-${Date.now().toString().slice(-4)}`,
    };
    customers = [newCust, ...customers];
    return newCust;
  },
};

// Inventory Service
export const inventoryService = {
  async getAll(): Promise<InventoryRecord[]> {
    await delay(150);
    return [...inventory];
  },

  async adjustStock(id: string, adjustment: number): Promise<InventoryRecord> {
    await delay(180);
    inventory = inventory.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantityOnHand + adjustment);
        const available = Math.max(0, newQty - item.reservedQuantity);
        const status =
          newQty <= 0
            ? 'CRITICAL'
            : newQty <= item.reorderPoint
            ? 'REORDER_NOW'
            : newQty > 300
            ? 'OVERSTOCKED'
            : 'OPTIMAL';
        return {
          ...item,
          quantityOnHand: newQty,
          availableQuantity: available,
          status,
          updatedAt: new Date().toISOString(),
        };
      }
      return item;
    });
    const updated = inventory.find((i) => i.id === id);
    if (!updated) throw new Error('Item not found');
    return updated;
  },
};

// Billing Service
export const billingService = {
  async getAll(): Promise<InvoiceRecord[]> {
    await delay(150);
    return [...invoices];
  },

  async create(inv: Omit<InvoiceRecord, 'id'>): Promise<InvoiceRecord> {
    await delay(200);
    const newInv: InvoiceRecord = {
      ...inv,
      id: `inv-${Date.now().toString().slice(-4)}`,
    };
    invoices = [newInv, ...invoices];
    return newInv;
  },
};

// Audit Logs Service (TanStack Virtual 2,500+ records)
export const auditService = {
  async getVirtualLogs(): Promise<AuditLogRecord[]> {
    await delay(100);
    return auditLogs;
  },
};
