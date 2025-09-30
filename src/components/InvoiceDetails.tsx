import React, { useState } from 'react';
import type { Invoice, Activity } from '../types';
import ActivityItem from './ActivityItem';
import Button from './Button';

interface InvoiceDetailsProps {
    invoice: Invoice;
    activities: Activity[];
    isLoading?: boolean;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoice, activities, isLoading = false }) => {
    const [showMoreMenu, setShowMoreMenu] = useState(false);

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
                return 'bg-green-100 text-green-800';
            case 'OVERDUE':
                return 'bg-red-100 text-red-800';
            case 'DRAFT':
                return 'bg-gray-100 text-gray-800';
            case 'PENDING PAYMENT':
                return 'bg-yellow-100 text-yellow-800';
            case 'PARTIAL PAYMENT':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };


    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 animate-pulse">
                <div className="w-64 h-8 bg-gray-200 rounded mb-4"></div>
                <div className="w-48 h-4 bg-gray-200 rounded mb-8"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="w-full h-32 bg-gray-200 rounded"></div>
                        <div className="w-full h-64 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-full h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl lg:text-2xl font-semibold text-gray-900 mb-2">
                        Invoice - {invoice.invoiceNumber}
                    </h1>
                    <p className="text-gray-600 mb-4">
                        View the details and activity of this invoice
                    </p>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                    </div>
                </div>


                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                    <Button size='lg' text="DOWNLOAD AS PDF" className='text-[10px]' />
                    <Button size='lg' text="SEND INVOICE" className='text-[10px] bg-blue-600 text-white hover:text-white' />

                    <div className="relative w-full sm:w-auto">
                        <Button size='lg' className='text-[10px]'
                            text='MORE'
                            onClick={() => setShowMoreMenu(!showMoreMenu)}
                        />

                        {showMoreMenu && (
                            <div className="absolute top-full left-0 mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    DUPLICATE INVOICE
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    GET SHARABLE LINK
                                </a>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <div className='mb-6'>
                <div className="flex flex-wrap items-center gap-2 border rounded-2xl p-4 w-fit ">
                    <h2 className="text-sm font-medium">REMINDERS</h2>
                    {invoice.reminders.map((reminder) => (
                        <button
                            key={reminder.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${reminder.isActive
                                ? 'bg-[#E6FFF0] .text-white'
                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {reminder.label}

                            {reminder.isActive && (
                                <svg className="w-4 h-4 inline ml-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Main content */}

                <div className="lg:col-span-2 space-y-6 lg:space-y-8 rounded-3xl p-6 border border-gray-200">

                    {/* Sender and Customer */}
                    <div className="bg-[#FCDDEC] rounded-3xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-xs text-gray-500 mb-3">SENDER</h3>
                                <div className="space-y-2">
                                    <div className="flex space-x-2">
                                        <img src={'/icons/sender.svg'} alt="sender" className="w-14 h-14" />
                                        <div className='space-y-2'>
                                            <span className="font-semibold text-gray-900">{invoice.sender.name}</span>
                                            <p className="text-xs text-gray-600">{invoice.sender.phone}</p>
                                            <p className="text-xs text-gray-600">{invoice.sender.address}</p>
                                            <p className="text-xs text-gray-600">{invoice.sender.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-xs text-gray-500 mb-3">CUSTOMER</h3>
                                <div className="space-y-2">
                                    <p className="font-semibold text-gray-900">{invoice.customerName}</p>
                                    <p className="text-xs text-gray-600">{invoice.customerPhone}</p>
                                    <p className="text-xs text-gray-600">{invoice.customerEmail}</p>
                                </div>
                            </div>

                        </div>
                        <div className='mt-4 sm:mt-10'>
                            <h2 className="text-xs font-semibold text-gray-500">INVOICE DETAILS</h2>
                            <div className="flex justify-between gap-4">
                                <div>
                                    <span className="text-[10px] font-medium text-gray-500">INVOICE NO</span>
                                    <p className="font-semibold text-xs text-gray-900">{invoice.invoiceNumber}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-medium text-gray-500">ISSUE DATE</span>
                                    <p className="font-semibold text-xs text-gray-900">{invoice.issueDate}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-medium text-gray-500">DUE DATE</span>
                                    <p className="font-semibold text-xs text-gray-900">{invoice.dueDate}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-medium text-gray-500">BILLING CURRENCY</span>
                                    <p className="font-semibold text-xs text-gray-900">{invoice.billingCurrency}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Items</h2>
                        <div className="space-y-4">
                            {invoice.items.map((item) => (
                                <div key={item.id} className="py-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-1/3">
                                            <h4 className="font-medium text-gray-900 mb-1">Email Marketing</h4>
                                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                        </div>
                                        <div className='items-start'>{item.quantity}</div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span>{formatCurrency(item.unitPrice)}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">{formatCurrency(item.total)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="text-right">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm font-semibold text-gray-600">SUBTOTAL</span>
                                <span className="font-semibold">{formatCurrency(invoice.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-semibold text-gray-600">DISCOUNT ({invoice.discountPercentage}%)</span>
                                <span className="font-semibold">{formatCurrency(invoice.discount)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold text-gray-900">TOTAL AMOUNT DUE</span>
                                    <span className="text-lg font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className='border rounded-3xl p-6'>
                        <h2 className="text-sm font-semibold text-gray-400 mb-4">PAYMENT INFORMATION</h2>
                        <div className="flex flex-wrap justify-between gap-4">
                            <div>
                                <span className="text-[10px] font-medium text-gray-600">ACCOUNT NAME</span>
                                <p className="font-semibold text-xs text-gray-900">{invoice.paymentInfo.accountName}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-medium text-gray-600">ACCOUNT NUMBER</span>
                                <p className="font-semibold text-xs text-gray-900">{invoice.paymentInfo.accountNumber}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-medium text-gray-600">ACH ROUTING NO</span>
                                <p className="font-semibold text-xs text-gray-900">{invoice.paymentInfo.achRoutingNo}</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-medium text-gray-600">BANK NAME</span>
                                <p className="font-semibold text-xs text-gray-900">{invoice.paymentInfo.bankName}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[10px] font-medium text-gray-600">BANK ADDRESS</span>
                                <p className="font-semibold text-xs text-gray-900">{invoice.paymentInfo.bankAddress}</p>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    {invoice.note && (
                        <div className='rounded-3xl bg-[#F6F8FA] p-6'>
                            <h2 className="text-xs font-medium text-gray-400 mb-4">NOTE</h2>
                            <p className="text-gray-600">{invoice.note}</p>
                        </div>
                    )}
                </div>

                {/* Activity sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Invoice Activity</h2>
                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <ActivityItem key={activity.id} activity={activity} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetails;
