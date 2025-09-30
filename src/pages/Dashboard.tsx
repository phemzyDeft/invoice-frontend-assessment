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

    const handleRetry = () => {
        fetchDashboardData();
    };

    const handleInvoiceClick = (invoiceId: string) => {
        setSelectedInvoiceId(invoiceId);
        setIsModalOpen(true);
    };

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                {/* Dashboard Cards */}
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl font-medium text-gray-900'>Invoice</h2>
                    <div className='flex items-center gap-4'>
                        <Button size='lg' className='uppercase text-[10px] px-10 py-4 bg-white text-gray-400' text='see what’s new' />
                        <Button size='lg' className='uppercase text-[10px] px-10 py-4 bg-[#003EFF] text-white hover:text-white' text='create' />
                    </div>
                </div>
                {stats && <DashboardCards stats={stats} />}

                {/* Invoice Actions */}
                <InvoiceActions />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
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
