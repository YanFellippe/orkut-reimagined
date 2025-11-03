import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Users, MapPin, Search } from 'lucide-react';

const AllFriendsModal = ({ friends, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar amigos baseado no termo de pesquisa
  const filteredFriends = useMemo(() => {
    if (!searchTerm.trim()) return friends;
    
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (friend.location && friend.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [friends, searchTerm]);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-orkut-pink text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users size={20} />
            <h2 className="text-lg font-bold">Todos os Amigos ({filteredFriends.length})</h2>
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
              placeholder="Pesquisar amigos por nome ou localização..."
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
              {filteredFriends.length === 0 
                ? 'Nenhum amigo encontrado' 
                : `${filteredFriends.length} amigo${filteredFriends.length !== 1 ? 's' : ''} encontrado${filteredFriends.length !== 1 ? 's' : ''}`
              }
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-140px)]">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-8">
              <Users size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'Nenhum amigo encontrado' : 'Nenhum amigo para exibir'}
              </p>
              {searchTerm && (
                <p className="text-gray-400 text-sm mt-2">
                  Tente pesquisar com outros termos
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFriends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  onClose();
                  navigate(`/friend/${friend.id}`);
                }}
              >
                <div className="text-center">
                  <div className="relative mb-2 mx-auto w-16 h-16">
                    <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200">
                      {friend.avatar ? (
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orkut-pink to-pink-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {getInitials(friend.name)}
                          </span>
                        </div>
                      )}
                    </div>
                    {friend.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="text-sm">
                    <div className="font-medium text-gray-800 truncate mb-1">
                      {friend.name}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      ({friend.mutualFriends}) amigos em comum
                    </div>
                    {friend.location && (
                      <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                        <MapPin size={10} />
                        <span className="truncate">{friend.location}</span>
                      </div>
                    )}
                    <div className="text-xs mt-1">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {friend.isOnline ? 'Online' : 'Offline'}
                    </div>
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

export default AllFriendsModal;