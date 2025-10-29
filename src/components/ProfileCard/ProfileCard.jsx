import React from 'react';
import { motion } from 'framer-motion';

const ProfileCard = ({ user }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="orkut-card p-4 text-center"
    >
      {/* Avatar */}
      <div className="w-16 h-16 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
        <span className="text-white font-bold text-lg">
          {getInitials(user.name)}
        </span>
      </div>
      
      {/* User Info */}
      <h3 className="font-bold text-gray-800 mb-1">{user.name}</h3>
      <p className="text-sm text-gray-600 mb-3">Conectado agora</p>
      
      {/* Status */}
      <div className="flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs text-gray-500">Online</span>
      </div>
    </motion.div>
  );
};

export default ProfileCard;