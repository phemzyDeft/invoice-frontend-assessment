/**
 * Utility helper functions for the invoice application
 */

/**
 * Formats a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Formats a date string to a readable format
 * @param {string} dateString - The date string to format
 * @param {Intl.DateTimeFormatOptions} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (
  dateString: string, 
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string => {
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Formats a timestamp to a relative time string
 * @param {string} timestamp - The timestamp to format
 * @returns {string} Relative time string (e.g., "2 hours ago")
 */
export const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(timestamp);
  }
};

/**
 * Truncates text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length of the text
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

/**
 * Generates a random ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} Random ID string
 */
export const generateId = (prefix: string = ''): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  return prefix ? `${prefix}-${timestamp}-${randomStr}` : `${timestamp}-${randomStr}`;
};

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: 'Password is valid' };
};

/**
 * Gets status color classes for invoice status
 * @param {string} status - Invoice status
 * @returns {string} CSS classes for the status
 */
export const getStatusColor = (status: string): string => {
  const statusColors = {
    'PAID': 'bg-green-100 text-green-800 border-green-200',
    'OVERDUE': 'bg-red-100 text-red-800 border-red-200',
    'DRAFT': 'bg-gray-100 text-gray-800 border-gray-200',
    'PENDING PAYMENT': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'PARTIAL PAYMENT': 'bg-blue-100 text-blue-800 border-blue-200'
  };
  
  return statusColors[status as keyof typeof statusColors] || statusColors.DRAFT;
};

/**
 * Groups invoices by date
 * @param {Array} invoices - Array of invoices
 * @returns {object} Object with dates as keys and invoice arrays as values
 */
export const groupInvoicesByDate = (invoices: any[]) => {
  const groups: { [key: string]: any[] } = {};

  invoices.forEach(invoice => {
    const date = new Date(invoice.createdAt).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(invoice);
  });

  return groups;
};

/**
 * Handles keyboard events for accessibility
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Function} handler - Function to call on specific key
 * @param {string} key - Key to listen for (default: 'Enter')
 */
export const handleKeyPress = (
  event: React.KeyboardEvent,
  handler: () => void,
  key: string = 'Enter'
): void => {
  if (event.key === key) {
    event.preventDefault();
    handler();
  }
};

/**
 * Scrolls to top of page
 */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};
