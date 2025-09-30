import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', icon: '/icons/home.svg', label: 'Getting Started' },
    { path: '/', icon: '/icons/overview.svg', label: 'Overview' },
    { path: '/', icon: '/icons/home.svg', label: 'Accounts' },
    { path: '/invoices', icon: '/icons/invoice.svg', label: 'Invoice' },
    { path: '/', icon: '/icons/beneficiary.svg', label: 'Beneficiary Management' },
    { path: '/', icon: '/icons/help.svg', label: 'Help Center' },
    { path: '/', icon: '/icons/settings.svg', label: 'Settings' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white w-84 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 flex items-center justify-center text-blue-600 font-semibold text-sm">
              1
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === '/invoices' && location.pathname.startsWith('/invoices'));
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-full text-left transition-colors
                    ${isActive 
                      ? 'bg-white border-4 border-gray-50 shadow-sm' 
                      : 'hover:bg-white hover:shadow-sm'
                    }
                  `}
                >
                  <img className="text-lg" src={item.icon} />
                  <span className={`font-medium text-primary-600 text-sm`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
