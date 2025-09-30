import React from 'react';
import type { DashboardStats } from '../types';

interface DashboardCardsProps {
    stats: DashboardStats;
    isLoading?: boolean;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ stats, isLoading = false }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const cards = [
        {
            title: 'TOTAL PAID',
            count: stats.totalPaid.count,
            amount: stats.totalPaid.amount,
            badgeColor: 'bg-[#B6FDD3] text-black',
            countBg: 'bg-green-500'
        },
        {
            title: 'TOTAL OVERDUE',
            count: stats.totalOverdue.count,
            amount: stats.totalOverdue.amount,
            badgeColor: 'bg-[#FFB7BD] text-black',
            countBg: 'bg-red-500'
        },
        {
            title: 'TOTAL DRAFT',
            count: stats.totalDraft.count,
            amount: stats.totalDraft.amount,
            badgeColor: 'bg-[#D9D9E0] text-black',
            countBg: 'bg-gray-500'
        },
        {
            title: 'TOTAL UNPAID',
            count: stats.totalUnpaid.count,
            amount: stats.totalUnpaid.amount,
            badgeColor: 'bg-[#F8E39B] text-black',
            countBg: 'bg-yellow-500'
        }
    ];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                            <div className="w-8 h-6 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="w-24 h-8 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-3xl px-8 p-10 shadow-sm">
                    <div className="mb-4">
                            <img className='h-10 w-10' src={"/icons/overview.svg"} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-x-2">
                            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                            <div className={`px-3 py-2 rounded-full text-xs font-medium ${card.badgeColor}`}>
                                {card.count.toString().padStart(2, '0')}
                            </div>
                        </div>
                        <p className="text-xl font-semibold text-gray-900">
                            {formatCurrency(card.amount)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardCards;
