import type { Invoice, Activity, DashboardStats, ApiResponse } from '../types';

// Mock data
const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: '1023494-2304',
    customerName: 'Olaniyi Ojo Adewale',
    customerEmail: 'olaniyi@example.com',
    customerPhone: '+386 989 271 3115',
    status: 'PAID',
    issueDate: 'March 30th, 2023',
    dueDate: 'May 19th, 2023',
    subtotal: 6697200.00,
    discount: 167430.00,
    discountPercentage: 2.5,
    totalAmount: 6529770.00,
    currency: 'USD',
    billingCurrency: 'USD ($)',
    sender: {
      name: 'Fabulous Enterprise',
      phone: '+386 989 271 3115',
      email: 'info@fabulousenterise.co',
      address: '1331 Hart Ridge Road 48436 Gaines, MI'
    },
    items: [
      {
        id: '1',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
        quantity: 10,
        unitPrice: 1500.00,
        total: 15000.00
      },
      {
        id: '2',
        description: 'Video looping effect',
        quantity: 6,
        unitPrice: 1110500.00,
        total: 6663000.00
      },
      {
        id: '3',
        description: 'Tsit voluptatem accusantium',
        quantity: 7,
        unitPrice: 2750.00,
        total: 19250.00
      }
    ],
    paymentInfo: {
      accountName: 'Fabulous Enterprise',
      accountNumber: '1234567890',
      achRoutingNo: '987654321',
      bankName: 'First National Bank',
      bankAddress: '123 Bank Street, City, State 12345'
    },
    note: 'Thank you for your patronage',
    reminders: [
      { id: '1', label: '14 days before due date', daysBeforeDue: 14, isActive: true },
      { id: '2', label: '7 days before due date', daysBeforeDue: 7, isActive: true },
      { id: '3', label: '3 days before due date', daysBeforeDue: 3, isActive: false },
      { id: '4', label: '24 hrs before due date', daysBeforeDue: 1, isActive: false },
      { id: '5', label: 'On the due date', daysBeforeDue: 0, isActive: false }
    ],
    createdAt: '2022-11-27T10:00:00Z',
    updatedAt: '2022-11-27T10:00:00Z'
  },
  {
    id: '2',
    invoiceNumber: '1023495-2305',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 555 123 4567',
    status: 'OVERDUE',
    issueDate: 'November 15th, 2022',
    dueDate: 'December 15th, 2022',
    subtotal: 5000.00,
    discount: 0.00,
    discountPercentage: 0,
    totalAmount: 5000.00,
    currency: 'USD',
    billingCurrency: 'USD ($)',
    sender: {
      name: 'Fabulous Enterprise',
      phone: '+386 989 271 3115',
      email: 'info@fabulousenterise.co',
      address: '1331 Hart Ridge Road 48436 Gaines, MI'
    },
    items: [
      {
        id: '1',
        description: 'Web Development Services',
        quantity: 1,
        unitPrice: 5000.00,
        total: 5000.00
      }
    ],
    paymentInfo: {
      accountName: 'Fabulous Enterprise',
      accountNumber: '1234567890',
      achRoutingNo: '987654321',
      bankName: 'First National Bank',
      bankAddress: '123 Bank Street, City, State 12345'
    },
    reminders: [
      { id: '1', label: '14 days before due date', daysBeforeDue: 14, isActive: true },
      { id: '2', label: '7 days before due date', daysBeforeDue: 7, isActive: false },
      { id: '3', label: '3 days before due date', daysBeforeDue: 3, isActive: false },
      { id: '4', label: '24 hrs before due date', daysBeforeDue: 1, isActive: false },
      { id: '5', label: 'On the due date', daysBeforeDue: 0, isActive: false }
    ],
    createdAt: '2022-11-15T10:00:00Z',
    updatedAt: '2022-12-08T10:00:00Z'
  },
  {
    id: '3',
    invoiceNumber: '1023496-2306',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1 555 987 6543',
    status: 'DRAFT',
    issueDate: 'December 8th, 2022',
    dueDate: 'January 8th, 2023',
    subtotal: 2500.00,
    discount: 125.00,
    discountPercentage: 5,
    totalAmount: 2375.00,
    currency: 'USD',
    billingCurrency: 'USD ($)',
    sender: {
      name: 'Fabulous Enterprise',
      phone: '+386 989 271 3115',
      email: 'info@fabulousenterise.co',
      address: '1331 Hart Ridge Road 48436 Gaines, MI'
    },
    items: [
      {
        id: '1',
        description: 'Design Services',
        quantity: 5,
        unitPrice: 500.00,
        total: 2500.00
      }
    ],
    paymentInfo: {
      accountName: 'Fabulous Enterprise',
      accountNumber: '1234567890',
      achRoutingNo: '987654321',
      bankName: 'First National Bank',
      bankAddress: '123 Bank Street, City, State 12345'
    },
    reminders: [
      { id: '1', label: '14 days before due date', daysBeforeDue: 14, isActive: false },
      { id: '2', label: '7 days before due date', daysBeforeDue: 7, isActive: false },
      { id: '3', label: '3 days before due date', daysBeforeDue: 3, isActive: false },
      { id: '4', label: '24 hrs before due date', daysBeforeDue: 1, isActive: false },
      { id: '5', label: 'On the due date', daysBeforeDue: 0, isActive: false }
    ],
    createdAt: '2022-12-08T10:00:00Z',
    updatedAt: '2022-12-08T10:00:00Z'
  }
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'CREATED',
    description: 'Invoice creation',
    user: 'You',
    timestamp: '2022-11-26T12:05:00Z',
    details: 'Created invoice 00239434/Olaniyi Ojo Adewale'
  },
  {
    id: '2',
    type: 'SENT',
    description: 'Invoice sent',
    user: 'You',
    timestamp: '2022-11-27T10:20:00Z',
    details: 'Sent invoice 00239434/Olaniyi Ojo Adewale to Olaniyi Ojo Adewale'
  },
  {
    id: '3',
    type: 'PAYMENT_CONFIRMED',
    description: 'Payment Confirmed',
    user: 'You',
    timestamp: '2022-11-27T12:20:00Z',
    amount: 503000.00,
    details: 'Manually confirmed a partial payment of $503,000.00'
  },
  {
    id: '4',
    type: 'PAYMENT_CONFIRMED',
    description: 'Payment Confirmed',
    user: 'You',
    timestamp: '2022-11-27T14:20:00Z',
    amount: 6000000.00,
    details: 'Manually confirmed a full payment of $6,000,000.00'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const apiService = {
  // Fetch all invoices
  async getInvoices(): Promise<ApiResponse<Invoice[]>> {
    await delay(1000); // Simulate network delay
    return {
      data: mockInvoices,
      success: true
    };
  },

  // Fetch invoice by ID
  async getInvoiceById(id: string): Promise<ApiResponse<Invoice | null>> {
    await delay(800);
    const invoice = mockInvoices.find(inv => inv.id === id);
    return {
      data: invoice || null,
      success: !!invoice,
      message: invoice ? undefined : 'Invoice not found'
    };
  },

  // Fetch dashboard stats
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    await delay(600);
    
    const stats: DashboardStats = {
      totalPaid: {
        count: mockInvoices.filter(inv => inv.status === 'PAID').length,
        amount: mockInvoices
          .filter(inv => inv.status === 'PAID')
          .reduce((sum, inv) => sum + inv.totalAmount, 0)
      },
      totalOverdue: {
        count: mockInvoices.filter(inv => inv.status === 'OVERDUE').length,
        amount: mockInvoices
          .filter(inv => inv.status === 'OVERDUE')
          .reduce((sum, inv) => sum + inv.totalAmount, 0)
      },
      totalDraft: {
        count: mockInvoices.filter(inv => inv.status === 'DRAFT').length,
        amount: mockInvoices
          .filter(inv => inv.status === 'DRAFT')
          .reduce((sum, inv) => sum + inv.totalAmount, 0)
      },
      totalUnpaid: {
        count: mockInvoices.filter(inv => inv.status === 'PENDING PAYMENT').length,
        amount: mockInvoices
          .filter(inv => inv.status === 'PENDING PAYMENT')
          .reduce((sum, inv) => sum + inv.totalAmount, 0)
      }
    };

    return {
      data: stats,
      success: true
    };
  },

  // Fetch recent activities
  async getRecentActivities(): Promise<ApiResponse<Activity[]>> {
    await delay(500);
    return {
      data: mockActivities,
      success: true
    };
  },

  // Update invoice status
  async updateInvoiceStatus(id: string, status: Invoice['status']): Promise<ApiResponse<Invoice>> {
    await delay(800);
    const invoiceIndex = mockInvoices.findIndex(inv => inv.id === id);
    
    if (invoiceIndex === -1) {
      return {
        data: null as any,
        success: false,
        message: 'Invoice not found'
      };
    }

    mockInvoices[invoiceIndex].status = status;
    mockInvoices[invoiceIndex].updatedAt = new Date().toISOString();

    return {
      data: mockInvoices[invoiceIndex],
      success: true
    };
  },

  // Create new invoice
  async createInvoice(invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Invoice>> {
    await delay(1200);
    
    const newInvoice: Invoice = {
      ...invoiceData,
      id: (mockInvoices.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockInvoices.push(newInvoice);

    return {
      data: newInvoice,
      success: true
    };
  }
};
