export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'PAID' | 'OVERDUE' | 'DRAFT' | 'PENDING PAYMENT' | 'PARTIAL PAYMENT';
  issueDate: string;
  dueDate: string;
  subtotal: number;
  discount: number;
  discountPercentage: number;
  totalAmount: number;
  currency: string;
  billingCurrency: string;
  sender: Sender;
  items: InvoiceItem[];
  paymentInfo: PaymentInfo;
  note?: string;
  reminders: Reminder[];
  createdAt: string;
  updatedAt: string;
}

export interface Sender {
  name: string;
  phone: string;
  email: string;
  address: string;
  logo?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentInfo {
  accountName: string;
  accountNumber: string;
  achRoutingNo: string;
  bankName: string;
  bankAddress: string;
}

export interface Reminder {
  id: string;
  label: string;
  daysBeforeDue: number;
  isActive: boolean;
}

export interface Activity {
  id: string;
  type: 'CREATED' | 'SENT' | 'PAYMENT_CONFIRMED' | 'STATUS_CHANGED';
  description: string;
  user: string;
  timestamp: string;
  amount?: number;
  details?: string;
}

export interface DashboardStats {
  totalPaid: {
    count: number;
    amount: number;
  };
  totalOverdue: {
    count: number;
    amount: number;
  };
  totalDraft: {
    count: number;
    amount: number;
  };
  totalUnpaid: {
    count: number;
    amount: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
