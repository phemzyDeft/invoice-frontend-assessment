import React from 'react';
import type { Invoice } from '../types';
import Button from './Button';
interface InvoiceListProps {
    invoices: Invoice[];
    isLoading?: boolean;
    onInvoiceClick: (invoiceId: string) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, isLoading = false, onInvoiceClick }) => {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const getStatusColor = (status: Invoice['status']) => {
        switch (status) {
            case 'PAID':
                return 'border border-green-200 bg-green-100 text-green-800';
            case 'OVERDUE':
                return 'border border-red-200 bg-red-100 text-red-800';
            case 'DRAFT':
                return 'border border-gray-200 bg-gray-100 text-gray-800';
            case 'PENDING PAYMENT':
                return 'border border-yellow-200 bg-yellow-100 text-yellow-800';
            case 'PARTIAL PAYMENT':
                return 'border border-blue-200 bg-blue-100 text-blue-800';
            default:
                return 'border border-gray-200 bg-gray-100 text-gray-800';
        }
    };


    const groupInvoicesByDate = (invoices: Invoice[]) => {
        const groups: { [key: string]: Invoice[] } = {};

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

    const handleInvoiceClick = (invoiceId: string) => {
        onInvoiceClick(invoiceId);
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-3xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
                    <div className="w-32 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="w-48 h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="w-32 h-3 bg-gray-200 rounded mb-1"></div>
                                    <div className="w-24 h-6 bg-gray-200 rounded"></div>
                                </div>
                                <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const groupedInvoices = groupInvoicesByDate(invoices);

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
                <Button text="VIEW ALL INVOICES" />
            </div>

            <div className="space-y-6">
                {Object.entries(groupedInvoices).map(([date, dateInvoices]) => (
                    <div key={date}>
                        <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase">
                            {date}
                        </h3>
                        <div className="space-y-3">
                            {dateInvoices.map((invoice) => (
                                <div
                                    key={invoice.id}
                                    onClick={() => handleInvoiceClick(invoice.id)}
                                    className="rounded-lg p-4 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="">
                                            <div className="flex flex-col mb-2">
                                                <h4 className="font-semibold text-xs text-gray-600">
                                                    Invoice -
                                                </h4>
                                                <h4 className="font-semibold text-xs text-gray-600">
                                                    {invoice.invoiceNumber}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className="text-xs font-medium text-gray-400 mb-1">
                                                DUE DATE
                                            </p>
                                            <p className="text-sm font-medium text-gray-600 mb-1">
                                                {invoice.dueDate}
                                            </p>
                                        </div>
                                        <div className='flex flex-col items-end gap-4'>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {formatCurrency(invoice.totalAmount)}
                                            </p>

                                            <div className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                                {invoice.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvoiceList;
