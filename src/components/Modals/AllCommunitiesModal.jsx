import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Globe, Users, Crown, Lock } from 'lucide-react';

const AllCommunitiesModal = ({ communities, onClose }) => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-orkut-pink text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe size={20} />
            <h2 className="text-lg font-bold">Todas as Comunidades ({communities.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-pink-600 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  onClose();
                  navigate(`/community/${community.id}`);
                }}
              >
                {/* Cover Image */}
                <div className="h-20 bg-gradient-to-r from-orkut-pink to-purple-500 relative overflow-hidden">
                  <img
                    src={community.coverImage}
                    alt={community.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <div className="p-3">
                  {/* Community Avatar and Info */}
                  <div className="flex items-start space-x-3 -mt-8 relative">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white bg-white flex-shrink-0">
                      <img
                        src={community.avatar}
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 mt-6">
                      <h3 className="font-bold text-gray-800 truncate text-sm mb-1">
                        {community.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                        {community.isPrivate ? (
                          <Lock size={10} className="text-red-500" />
                        ) : (
                          <Globe size={10} className="text-green-500" />
                        )}
                        <span>{community.isPrivate ? 'Privada' : 'Pública'}</span>
                        <span>•</span>
                        <span>{community.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                    {community.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Users size={10} className="text-orkut-pink" />
                      <span className="font-semibold">{community.members.toLocaleString()}</span>
                      <span className="text-gray-500">membros</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Crown size={10} className="text-yellow-500" />
                      <span className="text-gray-700 truncate">{community.admin}</span>
                    </div>
                  </div>

                  {/* Mutual Friends */}
                  <div className="flex items-center space-x-1 text-xs text-gray-600 mt-2">
                    <Users size={10} />
                    <span>{community.mutualFriends} amigos em comum</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AllCommunitiesModal;