import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Invoice, Activity } from '../types';
import { apiService } from '../services/api';
import InvoiceDetails from '../components/InvoiceDetails';
import Loader from '../components/Loader';
import Error from '../components/Error';

const InvoiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchInvoiceData(id);
    }
  }, [id]);

  const fetchInvoiceData = async (invoiceId: string) => {
    try {
      setLoading(true);
      setError(null);

      const [invoiceResponse, activitiesResponse] = await Promise.all([
        apiService.getInvoiceById(invoiceId),
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
          activity.details?.includes(invoiceId) || 
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
    if (id) {
      fetchInvoiceData(id);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-gray-600">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Error 
            message={error || 'Invoice not found'} 
            onRetry={handleRetry} 
          />
          <button
            onClick={handleBack}
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <InvoiceDetails invoice={invoice} activities={activities} />
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
