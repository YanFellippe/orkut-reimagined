import React from 'react';
import { Search, Bell, Mail, Menu } from 'lucide-react';

const Header = ({ user, onMenuToggle, showMenuButton = false }) => {
  return (
    <header className="w-full bg-gradient-to-r from-white to-orkut-light-blue shadow-lg border-b-2 border-orkut-pink sticky top-0 z-30">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-orkut-blue transition-colors duration-200"
            >
              <Menu size={20} className="text-orkut-pink" />
            </button>
          )}
          
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-orkut-pink font-orkut tracking-tight">
              orkut
            </h1>
            <span className="ml-2 text-xs text-gray-500 font-normal">beta</span>
          </div>
        </div>
        
        {user ? (
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar no orkut"
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>
            
            {/* Notification Icons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-orkut-blue transition-colors duration-200">
                <Bell size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-orkut-blue transition-colors duration-200">
                <Mail size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <select className="bg-white border-2 border-orkut-pink rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orkut-pink shadow-sm">
              <option value="pt">Português (Brasil)</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;