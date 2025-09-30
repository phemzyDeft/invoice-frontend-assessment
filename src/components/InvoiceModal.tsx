import React, { useState, useEffect } from 'react';
import type { Invoice, Activity } from '../types';
import { apiService } from '../services/api';
import InvoiceDetails from './InvoiceDetails';
import Loader from './Loader';
import Error from './Error';

interface InvoiceModalProps {
  invoiceId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoiceId, isOpen, onClose }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && invoiceId) {
      fetchInvoiceData(invoiceId);
    }
  }, [isOpen, invoiceId]);

  const fetchInvoiceData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const [invoiceResponse, activitiesResponse] = await Promise.all([
        apiService.getInvoiceById(id),
        apiService.getRecentActivities()
      ]);

      if (invoiceResponse.success && invoiceResponse.data) {
        setInvoice(invoiceResponse.data);
      } else {
        setError(invoiceResponse.message || 'Invoice not found');
      }

      if (activitiesResponse.success) {
        // Filter activities for this specific invoice
        const invoiceActivities = activitiesResponse.data.filter(activity =>
          activity.details?.includes(id) ||
          activity.details?.includes(invoiceResponse.data?.invoiceNumber || '')
        );
        setActivities(invoiceActivities);
      }

    } catch (err) {
      setError('Failed to load invoice details');
      console.error('Invoice fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (invoiceId) {
      fetchInvoiceData(invoiceId);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="w-full fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center p-4"
      onClick={handleOverlayClick}
    >

      <div>

        <div className="flex items-end justify-end w-full mb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors bg-white"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="bg-white rounded-3xl max-w-7xl !w-full max-h-[90vh] overflow-y-auto">
          {loading ? (
            <div className="w-full flex items-center justify-center py-12">
              <div className="text-center">
                <Loader size="lg" />
                <p className="mt-4 text-gray-600">Loading invoice details...</p>
              </div>
            </div>
          ) : error || !invoice ? (
            <div className="p-8">
              <Error
                message={error || 'Invoice not found'}
                onRetry={handleRetry}
              />
            </div>
          ) : (
            <div>

              <div className="p-4 sm:p-6 lg:p-8">
                <InvoiceDetails invoice={invoice} activities={activities} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
