import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe } from 'lucide-react';
import FriendPreviewModal from '../Modals/FriendPreviewModal';
import CommunityPreviewModal from '../Modals/CommunityPreviewModal';
import AllFriendsModal from '../Modals/AllFriendsModal';
import AllCommunitiesModal from '../Modals/AllCommunitiesModal';
import { demoFriends, demoCommunities } from '../../utils/demoData';

const FriendsCommunitiesSidebar = ({ user }) => {
  const [hoveredFriend, setHoveredFriend] = useState(null);
  const [hoveredCommunity, setHoveredCommunity] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0, arrowPosition: 'left' });
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [showAllCommunities, setShowAllCommunities] = useState(false);

  // Usar dados compartilhados
  const friends = demoFriends;
  const communities = demoCommunities;

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
          {friends.slice(0, 15).map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center cursor-pointer group"
              onMouseEnter={(e) => handleMouseEnter('friend', friend, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => window.location.href = `/friend/${friend.id}`}
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
              onClick={() => window.location.href = `/community/${community.id}`}
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
          friends={demoFriends}
          onClose={() => setShowAllFriends(false)}
        />
      )}

      {/* All Communities Modal */}
      {showAllCommunities && (
        <AllCommunitiesModal
          communities={demoCommunities}
          onClose={() => setShowAllCommunities(false)}
        />
      )}
    </div>
  );
};

export default FriendsCommunitiesSidebar;