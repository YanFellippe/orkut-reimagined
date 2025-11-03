import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MessageCircle, Users, Globe, Settings, LogOut } from 'lucide-react';
import ProfileCard from '../ProfileCard/ProfileCard';
import AllFriendsModal from '../Modals/AllFriendsModal';
import AllCommunitiesModal from '../Modals/AllCommunitiesModal';
import ProfileModal from '../Modals/ProfileModal';
import MessagesModal from '../Modals/MessagesModal';
import { demoFriends, demoCommunities } from '../../utils/demoData';

const Sidebar = ({ user, onLogout, isOpen, onToggle }) => {
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  const handleMenuClick = (label) => {
    if (label === 'Perfil') {
      setShowProfileModal(true);
    } else if (label === 'Recados') {
      setShowMessagesModal(true);
    } else if (label === 'Amigos') {
      setShowAllFriends(true);
    } else if (label === 'Comunidades') {
      setShowAllCommunities(true);
    }
    // Fechar a sidebar após clicar em um item no mobile
    onToggle();
  };

  const menuItems = [
    { icon: User, label: 'Perfil', action: () => handleMenuClick('Perfil') },
    { icon: MessageCircle, label: 'Recados', action: () => handleMenuClick('Recados') },
    { icon: Users, label: 'Amigos', action: () => handleMenuClick('Amigos') },
    { icon: Globe, label: 'Comunidades', action: () => handleMenuClick('Comunidades') },
    { icon: Settings, label: 'Configurações', action: () => handleMenuClick('Configurações') },
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
              <motion.button
                key={item.label}
                onClick={item.action}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orkut-blue transition-colors duration-200 text-gray-700 hover:text-orkut-pink w-full text-left"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
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

      {/* Modals */}
      {showProfileModal && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {showMessagesModal && (
        <MessagesModal
          user={user}
          onClose={() => setShowMessagesModal(false)}
        />
      )}

      {showAllFriends && (
        <AllFriendsModal
          friends={demoFriends}
          onClose={() => setShowAllFriends(false)}
        />
      )}

      {showAllCommunities && (
        <AllCommunitiesModal
          communities={demoCommunities}
          onClose={() => setShowAllCommunities(false)}
        />
      )}
    </>
  );
};

export default Sidebar;