import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Globe, Users, Crown, Lock, Search } from 'lucide-react';

const AllCommunitiesModal = ({ communities, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar comunidades baseado no termo de pesquisa
  const filteredCommunities = useMemo(() => {
    if (!searchTerm.trim()) return communities;
    
    return communities.filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.admin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [communities, searchTerm]);
  
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
            <h2 className="text-lg font-bold">Todas as Comunidades ({filteredCommunities.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-pink-600 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar comunidades por nome, descrição, categoria ou administrador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orkut-pink focus:border-transparent outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2">
              {filteredCommunities.length === 0 
                ? 'Nenhuma comunidade encontrada' 
                : `${filteredCommunities.length} comunidade${filteredCommunities.length !== 1 ? 's' : ''} encontrada${filteredCommunities.length !== 1 ? 's' : ''}`
              }
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-140px)]">
          {filteredCommunities.length === 0 ? (
            <div className="text-center py-8">
              <Globe size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'Nenhuma comunidade encontrada' : 'Nenhuma comunidade para exibir'}
              </p>
              {searchTerm && (
                <p className="text-gray-400 text-sm mt-2">
                  Tente pesquisar com outros termos
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCommunities.map((community, index) => (
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
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AllCommunitiesModal;