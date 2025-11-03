import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Globe, UserPlus } from 'lucide-react';
import FriendPreviewModal from '../Modals/FriendPreviewModal';
import CommunityPreviewModal from '../Modals/CommunityPreviewModal';
import AllFriendsModal from '../Modals/AllFriendsModal';
import AllCommunitiesModal from '../Modals/AllCommunitiesModal';
import { demoFriends, demoCommunities } from '../../utils/demoData';
import { getCurrentFriendsList, getFriendSuggestions, notifyFriendshipChange } from '../../utils/friendshipUtils';

const FriendsCommunitiesSidebar = ({ user }) => {
  const navigate = useNavigate();
  const [hoveredFriend, setHoveredFriend] = useState(null);
  const [hoveredCommunity, setHoveredCommunity] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0, arrowPosition: 'left' });
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const communities = demoCommunities;

  // Escutar mudanças no localStorage para atualizar a lista
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(prev => prev + 1);
    };

    // Escutar eventos de storage
    window.addEventListener('storage', handleStorageChange);
    
    // Também escutar um evento customizado para mudanças locais
    window.addEventListener('friendshipChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('friendshipChanged', handleStorageChange);
    };
  }, []);

  // Obter dados atualizados
  const friends = getCurrentFriendsList();
  const suggestedFriends = getFriendSuggestions().slice(0, 8);

  // Forçar re-render quando refreshKey muda
  const friendsToShow = friends.slice(0, 15);
  const suggestionsToShow = suggestedFriends.slice(0, 8);

  const calculateModalPosition = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Dimensões do modal
    const modalWidth = 320; // w-80 = 320px
    const modalHeight = 400; // altura aproximada do modal
    const offset = 16; // espaçamento do cursor
    
    let x, y;
    let arrowPosition = 'left'; // posição da seta indicadora
    
    // Calcular posição horizontal
    const spaceRight = windowWidth - mouseX;
    const spaceLeft = mouseX;
    
    if (spaceRight >= modalWidth + offset) {
      // Há espaço à direita
      x = mouseX + offset;
      arrowPosition = 'left';
    } else if (spaceLeft >= modalWidth + offset) {
      // Há espaço à esquerda
      x = mouseX - modalWidth - offset;
      arrowPosition = 'right';
    } else {
      // Centralizar horizontalmente se não há espaço suficiente
      x = Math.max(20, (windowWidth - modalWidth) / 2);
      arrowPosition = 'none';
    }
    
    // Calcular posição vertical
    const spaceBelow = windowHeight - mouseY;
    const spaceAbove = mouseY;
    
    if (spaceBelow >= modalHeight + offset) {
      // Há espaço embaixo
      y = mouseY + offset;
    } else if (spaceAbove >= modalHeight + offset) {
      // Há espaço em cima
      y = mouseY - modalHeight - offset;
    } else {
      // Centralizar verticalmente se não há espaço suficiente
      y = Math.max(20, (windowHeight - modalHeight) / 2);
    }
    
    // Ajustes finais para garantir que não saia da tela
    x = Math.max(20, Math.min(x, windowWidth - modalWidth - 20));
    y = Math.max(20, Math.min(y, windowHeight - modalHeight - 20));
    
    return { x, y, arrowPosition };
  };

  const handleMouseEnter = (type, item, event) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    const position = calculateModalPosition(event);
    setModalPosition(position);
    
    const timeout = setTimeout(() => {
      if (type === 'friend') {
        setHoveredFriend(item);
      } else {
        setHoveredCommunity(item);
      }
    }, 300); // 300ms delay para resposta mais rápida
    
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredFriend(null);
    setHoveredCommunity(null);
  };

  // Função para atualizar posição do modal durante o hover (opcional)
  const handleMouseMove = (event) => {
    if (hoveredFriend || hoveredCommunity) {
      const position = calculateModalPosition(event);
      setModalPosition(position);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Friends Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="orkut-card p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center space-x-2">
            <Users size={18} className="text-orkut-pink" />
            <span>amigos ({friends.length})</span>
          </h3>
          <button 
            onClick={() => setShowAllFriends(true)}
            className="text-xs text-orkut-pink hover:underline"
          >
            ver todos
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {friendsToShow.map((friend, index) => (
            <motion.div
              key={`${friend.id}-${refreshKey}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center cursor-pointer group"
              onMouseEnter={(e) => handleMouseEnter('friend', friend, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate(`/friend/${friend.id}`)}
            >
              <div className="relative mb-2">
                <div className="w-12 h-12 mx-auto rounded-lg overflow-hidden bg-gray-200 group-hover:ring-2 group-hover:ring-orkut-pink transition-all duration-200">
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
              
              <div className="text-xs">
                <div className="font-medium text-gray-800 truncate group-hover:text-orkut-pink transition-colors duration-200">
                  {friend.name}
                </div>
                <div className="text-gray-500">
                  ({friend.mutualFriends})
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Communities Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="orkut-card p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center space-x-2">
            <Globe size={18} className="text-orkut-pink" />
            <span>comunidades ({communities.length})</span>
          </h3>
          <button 
            onClick={() => setShowAllCommunities(true)}
            className="text-xs text-orkut-pink hover:underline"
          >
            ver todas
          </button>
        </div>

        <div className="space-y-1.5 max-h-64 overflow-y-auto">
          {communities.slice(0, 12).map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors duration-200"
              onMouseEnter={(e) => handleMouseEnter('community', community, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate(`/community/${community.id}`)}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 group-hover:ring-2 group-hover:ring-orkut-pink transition-all duration-200">
                <img
                  src={community.avatar}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate group-hover:text-orkut-pink transition-colors duration-200">
                  {community.name}
                </div>
                <div className="text-xs text-gray-500">
                  {community.members.toLocaleString()} membros
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Friend Suggestions Section */}
      {suggestionsToShow.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="orkut-card p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center space-x-2">
              <UserPlus size={18} className="text-orkut-pink" />
              <span>sugestões de amigos</span>
            </h3>
          </div>

          <div className="space-y-2">
            {suggestionsToShow.map((friend, index) => (
              <motion.div
                key={`suggestion-${friend.id}-${refreshKey}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors duration-200"
                onMouseEnter={(e) => handleMouseEnter('friend', friend, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => navigate(`/friend/${friend.id}`)}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 group-hover:ring-2 group-hover:ring-orkut-pink transition-all duration-200">
                  {friend.avatar ? (
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orkut-pink to-pink-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {getInitials(friend.name)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate group-hover:text-orkut-pink transition-colors duration-200 text-sm">
                    {friend.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {friend.mutualFriends} amigos em comum
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Adicionar lógica de adicionar amigo aqui
                    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
                    const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
                    const userIdentifier = friend.email || `user_${friend.id}` || friend.name;
                    const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
                    
                    // Adicionar amizade bidirecional
                    friendships[friendshipKey] = {
                      addedAt: new Date().toISOString(),
                      status: 'friends',
                      source: 'suggestion' // Marcar como vindo de sugestão
                    };
                    
                    const reverseFriendshipKey = `${userIdentifier}_${currentUserEmail}`;
                    friendships[reverseFriendshipKey] = {
                      addedAt: new Date().toISOString(),
                      status: 'friends',
                      source: 'suggestion'
                    };
                    
                    localStorage.setItem('friendships', JSON.stringify(friendships));
                    
                    // Disparar evento para atualizar a interface
                    notifyFriendshipChange();
                    
                    // Mostrar feedback visual
                    const button = e.currentTarget;
                    button.innerHTML = '<svg class="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
                    button.disabled = true;
                    button.className = 'text-green-500 bg-green-100 p-1.5 rounded-full transition-all duration-200 cursor-not-allowed';
                    
                    // Remover o botão da lista após um delay
                    setTimeout(() => {
                      setRefreshKey(prev => prev + 1);
                    }, 1500);
                  }}
                  className="text-orkut-pink hover:bg-orkut-pink hover:text-white p-1.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                  title="Adicionar como amigo"
                >
                  <UserPlus size={14} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Preview Modals */}
      {hoveredFriend && (
        <FriendPreviewModal
          friend={hoveredFriend}
          position={modalPosition}
          onClose={() => setHoveredFriend(null)}
        />
      )}

      {hoveredCommunity && (
        <CommunityPreviewModal
          community={hoveredCommunity}
          position={modalPosition}
          onClose={() => setHoveredCommunity(null)}
        />
      )}

      {/* All Friends Modal */}
      {showAllFriends && (
        <AllFriendsModal
          friends={friends}
          onClose={() => setShowAllFriends(false)}
        />
      )}

      {/* All Communities Modal */}
      {showAllCommunities && (
        <AllCommunitiesModal
          communities={communities}
          onClose={() => setShowAllCommunities(false)}
        />
      )}
    </div>
  );
};

export default FriendsCommunitiesSidebar;