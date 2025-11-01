import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, MessageCircle, UserPlus, Heart } from 'lucide-react';

const FriendPreviewModal = ({ friend, position, onClose }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRelationshipIcon = (relationship) => {
    switch (relationship) {
      case 'solteiro':
      case 'solteira':
        return <Heart size={16} className="text-blue-500" />;
      case 'namorando':
        return <Heart size={16} className="text-pink-500" />;
      case 'casado':
      case 'casada':
        return <Heart size={16} className="text-red-500" />;
      default:
        return <Heart size={16} className="text-red-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${position?.x || 0}px`,
        top: `${position?.y || 0}px`,
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl border-2 border-orkut-pink p-4 w-80 pointer-events-auto relative">
        {/* Seta indicadora */}
        {position?.arrowPosition === 'left' && (
          <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l-2 border-t-2 border-orkut-pink transform rotate-45"></div>
        )}
        {position?.arrowPosition === 'right' && (
          <div className="absolute -right-2 top-4 w-4 h-4 bg-white border-r-2 border-b-2 border-orkut-pink transform rotate-45"></div>
        )}
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              {friend.avatar ? (
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orkut-pink to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {getInitials(friend.name)}
                  </span>
                </div>
              )}
            </div>
            {friend.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 truncate mb-1">
              {friend.name}
            </h3>
            
            <div className="space-y-1 text-xs text-gray-600">
              {friend.location && (
                <div className="flex items-center space-x-1">
                  <MapPin size={12} />
                  <span>{friend.location}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <span>{getRelationshipIcon(friend.relationship)}</span>
                <span>{friend.relationship}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Users size={12} />
                <span>{friend.mutualFriends} amigos em comum</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span>{friend.isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mt-3">
          <button className="flex-1 bg-orkut-pink text-white text-xs py-2 px-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center space-x-1">
            <MessageCircle size={12} />
            <span>Recado</span>
          </button>
          <button className="flex-1 bg-green-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-1">
            <UserPlus size={12} />
            <span>Adicionar</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-sm font-bold text-orkut-pink">156</div>
            <div className="text-xs text-gray-500">Amigos</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-orkut-pink">23</div>
            <div className="text-xs text-gray-500">Fotos</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-orkut-pink">8</div>
            <div className="text-xs text-gray-500">Vídeos</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FriendPreviewModal;