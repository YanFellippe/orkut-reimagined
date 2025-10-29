import React from 'react';
import { motion } from 'framer-motion';
import { User, MessageCircle, Users, Globe, Settings, LogOut } from 'lucide-react';
import ProfileCard from '../ProfileCard/ProfileCard';

const Sidebar = ({ user, onLogout, isOpen, onToggle }) => {
  const menuItems = [
    { icon: User, label: 'Perfil', href: '#' },
    { icon: MessageCircle, label: 'Recados', href: '#' },
    { icon: Users, label: 'Amigos', href: '#' },
    { icon: Globe, label: 'Comunidades', href: '#' },
    { icon: Settings, label: 'Configurações', href: '#' },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50"
      >
        <div className="p-4 space-y-4">
          {/* Profile Card */}
          <ProfileCard user={user} />
          
          {/* Profile Info for Mobile */}
          <div className="lg:hidden bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 space-y-1">
              {user.profile?.gender && (
                <div>{user.profile.gender}, {user.profile?.relationship || 'solteiro'}</div>
              )}
              {user.profile?.location && (
                <div>📍 {user.profile.location}</div>
              )}
              {user.profile?.bio && (
                <div className="italic mt-2">"{user.profile.bio}"</div>
              )}
            </div>
          </div>
          
          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orkut-blue transition-colors duration-200 text-gray-700 hover:text-orkut-pink"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
            
            {/* Logout Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: menuItems.length * 0.1 }}
              onClick={onLogout}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 text-red-600 hover:text-red-700 w-full"
            >
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </motion.button>
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;