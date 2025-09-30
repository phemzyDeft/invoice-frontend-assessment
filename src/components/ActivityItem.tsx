import React from 'react';
import type { Activity } from '../types';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Today, ${date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })}`;
    } else if (diffInHours < 48) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })}`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  return (
    <div className="flex items-start space-x-3">
      {/* Avatar */}
      <img src={"/icons/user.svg"} alt="activity" className="w-12 h-12" />

      {/* Activity content */}
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <h4 className="font-semibold text-base text-gray-600">{activity.description}</h4>
          {activity.amount && (
            <span className="font-semibold text-gray-900">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
              }).format(activity.amount)}
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-gray-600 mb-1">
          {formatTimestamp(activity.timestamp)}
        </p>
        {activity.details && (
          <p className="text-sm font-medium text-gray-500 bg-[#F6F8FA] rounded-xl px-4 py-6">
            {activity.details}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
