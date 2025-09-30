import React, { useState, useEffect } from 'react';
import type { DashboardStats, Invoice, Activity } from '../types';
import { apiService } from '../services/api';
import DashboardCards from '../components/DashboardCards';
import InvoiceActions from '../components/InvoiceActions';
import InvoiceList from '../components/InvoiceList';
import ActivityList from '../components/ActivityList';
import InvoiceModal from '../components/InvoiceModal';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Button from '../components/Button';

/**
 * Dashboard Component
 * 
 * Main dashboard page that displays:
 * - Dashboard statistics cards
 * - Invoice action buttons
 * - Recent invoices list
 * - Recent activities list
 * - Invoice details modal
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - Loading states and error handling
 * - Modal-based invoice details view
 * - Real-time data fetching
 * 
 * @returns {JSX.Element} Dashboard component
 */
const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    /**
     * Fetches dashboard data from the API
     * Includes statistics, invoices, and activities
     * Handles loading states and errors
     */
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [statsResponse, invoicesResponse, activitiesResponse] = await Promise.all([
                apiService.getDashboardStats(),
                apiService.getInvoices(),
                apiService.getRecentActivities()
            ]);

            if (statsResponse.success) {
                setStats(statsResponse.data);
            }

            if (invoicesResponse.success) {
                // Get recent invoices (last 10)
                const recentInvoices = invoicesResponse.data.slice(0, 10);
                setInvoices(recentInvoices);
            }

            if (activitiesResponse.success) {
                setActivities(activitiesResponse.data);
            }

        } catch (err) {
            setError('Failed to load dashboard data');
            console.error('Dashboard fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles retry action when data fetching fails
     */
    const handleRetry = () => {
        fetchDashboardData();
    };

    /**
     * Handles invoice click to open details modal
     * @param {string} invoiceId - The ID of the clicked invoice
     */
    const handleInvoiceClick = (invoiceId: string) => {
        setSelectedInvoiceId(invoiceId);
        setIsModalOpen(true);
    };

    /**
     * Handles closing the invoice details modal
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedInvoiceId(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader size="lg" />
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <Error message={error} onRetry={handleRetry} />
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-50 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-6 xl:py-8">
                {/* Dashboard Cards */}
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4'>
                    <h2 className='text-xl sm:text-2xl font-medium text-gray-900'>Invoice</h2>
                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4'>
                        <Button size='lg' className='uppercase text-[10px] px-6 sm:px-10 py-3 sm:py-4 bg-white text-gray-400' text="see what's new" />
                        <Button size='lg' className='uppercase text-[10px] px-6 sm:px-10 py-3 sm:py-4 bg-[#003EFF] text-white hover:text-white' text='create' />
                    </div>
                </div>
                {stats && <DashboardCards stats={stats} />}

                {/* Invoice Actions */}
                <InvoiceActions />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {/* Recent Invoices */}
                    <div className="lg:col-span-1">
                        <InvoiceList invoices={invoices} onInvoiceClick={handleInvoiceClick} />
                    </div>

                    {/* Recent Activities */}
                    <div className="lg:col-span-1">
                        <ActivityList activities={activities} />
                    </div>
                </div>

                {/* Invoice Modal */}
                <InvoiceModal
                    invoiceId={selectedInvoiceId}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </div>
    );
};

export default Dashboard;
