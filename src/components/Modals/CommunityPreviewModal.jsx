import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, Lock, Globe, UserPlus, Eye } from 'lucide-react';

const CommunityPreviewModal = ({ community, position, onClose }) => {
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
      <div className="bg-white rounded-xl shadow-2xl border-2 border-orkut-pink overflow-hidden w-80 pointer-events-auto relative">
        {/* Seta indicadora */}
        {position?.arrowPosition === 'left' && (
          <div className="absolute -left-2 top-6 w-4 h-4 bg-white border-l-2 border-t-2 border-orkut-pink transform rotate-45 z-10"></div>
        )}
        {position?.arrowPosition === 'right' && (
          <div className="absolute -right-2 top-6 w-4 h-4 bg-white border-r-2 border-b-2 border-orkut-pink transform rotate-45 z-10"></div>
        )}
        {/* Cover Image */}
        <div className="h-20 bg-gradient-to-r from-orkut-pink to-purple-500 relative overflow-hidden">
          <img
            src={community.coverImage}
            alt={community.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="p-4">
          {/* Community Avatar and Info */}
          <div className="flex items-start space-x-3 -mt-8 relative">
            <div className="w-16 h-16 rounded-lg overflow-hidden border-4 border-white bg-white flex-shrink-0">
              <img
                src={community.avatar}
                alt={community.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 mt-6">
              <h3 className="font-bold text-gray-800 truncate mb-1">
                {community.name}
              </h3>
              
              <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                {community.isPrivate ? (
                  <Lock size={12} className="text-red-500" />
                ) : (
                  <Globe size={12} className="text-green-500" />
                )}
                <span>{community.isPrivate ? 'Privada' : 'Pública'}</span>
                <span>•</span>
                <span>{community.category}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {community.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center space-x-2 text-sm">
              <Users size={14} className="text-orkut-pink" />
              <span className="font-semibold">{community.members.toLocaleString()}</span>
              <span className="text-gray-500">membros</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <Crown size={14} className="text-yellow-500" />
              <span className="text-gray-700 truncate">{community.admin}</span>
            </div>
          </div>

          {/* Mutual Friends */}
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-3">
            <Users size={12} />
            <span>{community.mutualFriends} amigos em comum</span>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex-1 bg-orkut-pink text-white text-xs py-2 px-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center space-x-1">
              <UserPlus size={12} />
              <span>Participar</span>
            </button>
            <button className="flex-1 bg-blue-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-1">
              <Eye size={12} />
              <span>Visitar</span>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">Atividade recente:</div>
            <div className="space-y-1">
              <div className="text-xs text-gray-700">
                • 5 novos membros hoje
              </div>
              <div className="text-xs text-gray-700">
                • 12 tópicos ativos
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityPreviewModal;