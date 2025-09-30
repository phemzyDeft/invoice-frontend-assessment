import React from 'react';

const InvoiceActions: React.FC = () => {
  const actions = [
    {
      title: 'Create New Invoice',
      subtitle: 'Create new invoices easily',
      icon: "/icons/money.svg",
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      onClick: () => {
        // Handle create invoice
        console.log('Create new invoice clicked');
      }
    },
    {
      title: 'Change Invoice settings',
      subtitle: 'Customise your invoices',
      icon: "/icons/settings.svg",
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      onClick: () => {
        // Handle change settings
        console.log('Change invoice settings clicked');
      }
    },
    {
      title: 'Manage Customer list',
      subtitle: 'Add and remove customers',
      icon: "/icons/beneficiary.svg",
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      onClick: () => {
        // Handle manage customers
        console.log('Manage customer list clicked');
      }
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Invoice Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.bgColor} ${action.textColor} p-10 rounded-3xl shadow-sm text-left hover:shadow-md transition-shadow`}
          >
            <div className="mb-4">
              <img className='h-20 w-20' src={action.icon} />
            </div>
            <h3 className="font-medium text-lg mb-2">{action.title}</h3>
            <p className={`text-sm ${action.bgColor === 'bg-blue-600' ? 'text-blue-100' : 'text-gray-600'}`}>
              {action.subtitle}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InvoiceActions;
