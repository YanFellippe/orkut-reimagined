import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Calendar, 
  Heart, 
  Users, 
  FileText, 
  Image, 
  MessageSquare,
  User,
  BarChart3,
  Building2,
  Star,
  Shield,
  Flame,
  Smile,
  Frown,
  Meh,
  ThumbsDown,
  Zap,
  Brain,
  UserPlus,
  UserCheck
} from 'lucide-react';
import { demoFriends, friendSuggestions } from '../../utils/demoData';
import { getTotalFriendsCount, notifyFriendshipChange } from '../../utils/friendshipUtils';
import Toast from '../Notifications/Toast';

const ProfileModal = ({ user, onClose }) => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalImages: 0,
    totalLikes: 0,
    totalComments: 0
  });

  const [friendRating, setFriendRating] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [friendsCount, setFriendsCount] = useState(156);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [refreshKey, setRefreshKey] = useState(0);

  // Calcular estatísticas e carregar avaliação
  useEffect(() => {
    const calculateStats = () => {
      // Buscar posts do localStorage
      const posts = JSON.parse(localStorage.getItem('orkutPosts') || '[]');
      
      // Buscar usuários para pegar o nome do usuário atual
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find(u => u.email === user.email);
      
      if (!currentUser) {
        return;
      }

      // Filtrar posts do usuário atual
      const userPosts = posts.filter(post => post.author === currentUser.name);
      
      // Calcular estatísticas
      const totalPosts = userPosts.length;
      
      // Calcular total de imagens dos posts
      let totalImages = 0;
      userPosts.forEach(post => {
        if (post.photos && post.photos.images) {
          totalImages += post.photos.images.length;
        }
      });
      
      // Calcular total de curtidas recebidas
      const totalLikes = userPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
      
      // Calcular total de comentários recebidos
      const totalComments = userPosts.reduce((sum, post) => {
        return sum + (post.commentsList ? post.commentsList.length : 0);
      }, 0);

      setStats({
        totalPosts,
        totalImages,
        totalLikes,
        totalComments
      });
    };

    const loadFriendRating = () => {
      // Carregar avaliação existente do localStorage
      const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const currentUserIdentifier = currentUserData.email || currentUserData.name;
      const ratings = JSON.parse(localStorage.getItem('friendRatings') || '{}');
      
      const userIdentifier = user.email || user.name;
      const ratingKey = `${currentUserIdentifier}_${userIdentifier}`;
      
      if (ratings[ratingKey]) {
        setFriendRating(ratings[ratingKey]);
        setHasRated(true);
      }
    };

    const loadFriendshipStatus = () => {
      const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const currentUserEmail = currentUserData.email;
      const currentUserName = currentUserData.name;
      
      // Usar email como identificador principal, nome como fallback
      const userIdentifier = user.email || user.name;
      const currentUserIdentifier = currentUserEmail || currentUserName;
      
      // Não pode ser amigo de si mesmo - verificação robusta
      const isSameUser = 
        (currentUserEmail && user.email && currentUserEmail.toLowerCase() === user.email.toLowerCase()) ||
        (currentUserName && user.name && currentUserName.toLowerCase() === user.name.toLowerCase()) ||
        (currentUserData.id && user.id && String(currentUserData.id) === String(user.id)) ||
        currentUserIdentifier === userIdentifier;
        
      if (isSameUser) {
        setIsFriend(false);
        setFriendsCount(getTotalFriendsCount());
        return;
      }

      // Verificar se o usuário está nos dados demo ou nas sugestões
      const isInDemoFriends = demoFriends.some(friend => 
        friend.id === user.id || 
        friend.name === user.name ||
        (friend.email && user.email && friend.email === user.email)
      );
      const isInSuggestions = friendSuggestions.some(suggestion => 
        suggestion.id === user.id || 
        suggestion.name === user.name ||
        (suggestion.email && user.email && suggestion.email === user.email)
      );
      

      
      // Verificar no sistema de amizades personalizado
      const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
      const friendshipKey = `${currentUserIdentifier}_${userIdentifier}`;
      const reverseFriendshipKey = `${userIdentifier}_${currentUserIdentifier}`;
      
      // Verificar se foi removido dos dados demo
      const wasRemovedFromDemo = friendships[friendshipKey]?.status === 'removed' && 
                                 friendships[friendshipKey]?.source === 'demo';
      
      // Verificar se foi adicionado manualmente ou de sugestão
      const wasAddedManually = (friendships[friendshipKey]?.status === 'friends' && 
                               (friendships[friendshipKey]?.source === 'manual' || friendships[friendshipKey]?.source === 'suggestion')) ||
                              (friendships[reverseFriendshipKey]?.status === 'friends' && 
                               (friendships[reverseFriendshipKey]?.source === 'manual' || friendships[reverseFriendshipKey]?.source === 'suggestion'));
      
      // São amigos se: está nos dados demo E não foi removido, OU foi adicionado manualmente/sugestão
      const areFriends = (isInDemoFriends && !wasRemovedFromDemo) || wasAddedManually;
      

      
      setIsFriend(areFriends);

      // Se está nos dados demo mas não no sistema, adicionar ao sistema
      if (isInDemoFriends && !friendships[friendshipKey] && !friendships[reverseFriendshipKey]) {
        friendships[friendshipKey] = {
          addedAt: new Date().toISOString(),
          status: 'friends',
          source: 'demo'
        };
        localStorage.setItem('friendships', JSON.stringify(friendships));
      }
      
      // Se está nas sugestões mas não foi adicionado, não é amigo
      if (isInSuggestions && !wasAddedManually) {
        setIsFriend(false);
      }

      // Usar função utilitária para calcular amigos
      setFriendsCount(getTotalFriendsCount());
    };

    calculateStats();
    loadFriendRating();
    loadFriendshipStatus();

    // Escutar mudanças de amizade
    const handleFriendshipChange = () => {
      loadFriendshipStatus();
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('friendshipChanged', handleFriendshipChange);

    // Recalcular quando houver mudanças
    const interval = setInterval(calculateStats, 2000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('friendshipChanged', handleFriendshipChange);
    };
  }, [user, user.email, user.id, user.name]);
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGenderIcon = () => {
    return <User size={16} className="text-blue-500" />;
  };

  const handleRateFriend = (rating) => {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentUserIdentifier = currentUserData.email || currentUserData.name;
    const ratings = JSON.parse(localStorage.getItem('friendRatings') || '{}');
    
    const userIdentifier = user.email || user.name;
    const ratingKey = `${currentUserIdentifier}_${userIdentifier}`;
    
    ratings[ratingKey] = rating;
    localStorage.setItem('friendRatings', JSON.stringify(ratings));
    
    setFriendRating(rating);
    setHasRated(true);
    
    // Mostrar notificação de avaliação
    setToast({
      show: true,
      message: `Você avaliou ${user.name} como "${getRatingLabel(rating)}"`,
      type: 'success'
    });
  };

  const handleAddFriend = () => {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentUserIdentifier = currentUserData.email || currentUserData.name;
    const userIdentifier = user.email || user.name;
    
    if (currentUserIdentifier === userIdentifier) {
      return; // Não pode adicionar a si mesmo
    }

    const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
    const friendshipKey = `${currentUserIdentifier}_${userIdentifier}`;
    
    // Adicionar amizade bidirecional
    friendships[friendshipKey] = {
      addedAt: new Date().toISOString(),
      status: 'friends',
      source: 'manual'
    };
    
    // Também adicionar na direção reversa para garantir consistência
    const reverseFriendshipKey = `${userIdentifier}_${currentUserIdentifier}`;
    friendships[reverseFriendshipKey] = {
      addedAt: new Date().toISOString(),
      status: 'friends',
      source: 'manual'
    };
    
    localStorage.setItem('friendships', JSON.stringify(friendships));
    setIsFriend(true);
    
    // Disparar evento para atualizar outras partes da interface
    notifyFriendshipChange();
    
    // Mostrar notificação de sucesso
    setToast({
      show: true,
      message: `${user.name} foi adicionado(a) aos seus amigos!`,
      type: 'success'
    });
    
    // Atualizar contagem (não incrementar se já estava nos dados demo)
    const wasInDemo = demoFriends.some(friend => 
      friend.name === user.name || friend.id === user.id || 
      (user.email && friend.email === user.email)
    );
    if (!wasInDemo) {
      setFriendsCount(prev => prev + 1);
    }
  };

  const handleRemoveFriend = () => {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentUserIdentifier = currentUserData.email || currentUserData.name;
    const userIdentifier = user.email || user.name;
    const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
    
    const friendshipKey = `${currentUserIdentifier}_${userIdentifier}`;
    const reverseFriendshipKey = `${userIdentifier}_${currentUserIdentifier}`;
    
    // Verificar se era dos dados demo ou das sugestões
    const wasInDemo = demoFriends.some(friend => 
      friend.name === user.name || friend.id === user.id || 
      (user.email && friend.email === user.email)
    );
    const wasInSuggestions = friendSuggestions.some(suggestion => 
      suggestion.name === user.name || suggestion.id === user.id || 
      (user.email && suggestion.email === user.email)
    );
    
    // Se era dos dados demo, não pode remover completamente, apenas marcar como removido
    if (wasInDemo) {
      friendships[friendshipKey] = {
        addedAt: new Date().toISOString(),
        status: 'removed',
        source: 'demo'
      };
    } else {
      // Se foi adicionado manualmente ou de sugestão, pode remover completamente
      delete friendships[friendshipKey];
      delete friendships[reverseFriendshipKey];
    }
    
    localStorage.setItem('friendships', JSON.stringify(friendships));
    setIsFriend(false);
    
    // Disparar evento para atualizar outras partes da interface
    notifyFriendshipChange();
    
    // Mostrar notificação
    setToast({
      show: true,
      message: `${user.name} foi removido(a) da sua lista de amigos.`,
      type: 'info'
    });
    
    // Ajustar contagem
    if (!wasInDemo) {
      setFriendsCount(prev => Math.max(demoFriends.length, prev - 1));
    } else {
      setFriendsCount(demoFriends.length - 1); // Diminuir dos dados demo
    }
    
    // Também remover avaliação se existir
    const ratings = JSON.parse(localStorage.getItem('friendRatings') || '{}');
    const ratingKey = `${currentUserIdentifier}_${userIdentifier}`;
    delete ratings[ratingKey];
    localStorage.setItem('friendRatings', JSON.stringify(ratings));
    
    setFriendRating(null);
    setHasRated(false);
  };

  const isCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Comparação direta se currentUser tiver dados
    if (currentUser.email && user.email) {
      return currentUser.email.toLowerCase().trim() === user.email.toLowerCase().trim();
    }
    
    if (currentUser.name && user.name) {
      return currentUser.name.toLowerCase().trim() === user.name.toLowerCase().trim();
    }
    
    if (currentUser.id && user.id) {
      return String(currentUser.id) === String(user.id);
    }
    
    // Fallback: Se currentUser está vazio, verificar se é o perfil principal
    // Assumir que "Yan Fellippe Gomes Basílio" é o usuário logado
    const isOwnProfile = user.name === 'Yan Fellippe Gomes Basílio' || 
                        user.isCurrentUser === true ||
                        window.location.pathname.includes('/profile/me');
    
    return (!currentUser.name && !currentUser.email && isOwnProfile);
  };

  const getRatingIcon = (rating) => {
    switch (rating) {
      // Positivas
      case 'legal':
        return <Star size={16} className="text-yellow-500" />;
      case 'confiavel':
        return <Shield size={16} className="text-blue-500" />;
      case 'sexy':
        return <Flame size={16} className="text-red-500" />;
      case 'divertido':
        return <Smile size={16} className="text-green-500" />;
      case 'inteligente':
        return <Brain size={16} className="text-purple-500" />;
      case 'incrivel':
        return <Zap size={16} className="text-orange-500" />;
      // Neutras
      case 'normal':
        return <Meh size={16} className="text-gray-500" />;
      // Negativas
      case 'chato':
        return <Frown size={16} className="text-red-600" />;
      case 'falso':
        return <ThumbsDown size={16} className="text-red-700" />;
      case 'irritante':
        return <X size={16} className="text-red-800" />;
      default:
        return null;
    }
  };

  const getRatingLabel = (rating) => {
    switch (rating) {
      // Positivas
      case 'legal':
        return 'Legal';
      case 'confiavel':
        return 'Confiável';
      case 'sexy':
        return 'Sexy';
      case 'divertido':
        return 'Divertido';
      case 'inteligente':
        return 'Inteligente';
      case 'incrivel':
        return 'Incrível';
      // Neutras
      case 'normal':
        return 'Normal';
      // Negativas
      case 'chato':
        return 'Chato';
      case 'falso':
        return 'Falso';
      case 'irritante':
        return 'Irritante';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-orkut-pink">Perfil de {user.name}</h2>
              {user.isOnline && (
                <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {!isCurrentUser() && (
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isFriend ? handleRemoveFriend : handleAddFriend}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isFriend 
                        ? 'bg-green-100 hover:bg-red-100 text-green-700 hover:text-red-700' 
                        : 'bg-orkut-pink hover:bg-pink-600 text-white'
                    }`}
                  >
                    {isFriend ? (
                      <>
                        <UserCheck size={16} />
                        <span>Amigos</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        <span>Adicionar</span>
                      </>
                    )}
                  </motion.button>
                  {isFriend && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Clique para remover da lista de amigos
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Photo */}
            <div className="md:col-span-1">
              <div className="w-full aspect-square bg-gradient-to-br from-orkut-pink via-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                {user.profile?.avatar ? (
                  <img 
                    src={user.profile.avatar} 
                    alt={user.name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-6xl font-bold text-white">
                    {getInitials(user.name)}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h3>
                {user.profile?.bio && (
                  <p className="text-gray-600 italic mb-4">"{user.profile.bio}"</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {getGenderIcon()}
                    <span className="text-gray-700">
                      {user.profile?.gender || 'Não informado'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Heart size={16} className="text-red-500" />
                    <span className="text-gray-700">
                      {user.profile?.relationship || 'Solteiro(a)'}
                    </span>
                  </div>

                  {user.profile?.age && (
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-blue-500" />
                      <span className="text-gray-700">{user.profile.age} anos</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {user.profile?.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-green-500" />
                      <span className="text-gray-700">{user.profile.location}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-purple-500" />
                    <span className="text-gray-700">{friendsCount} amigos</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              {user.profile?.interests && user.profile.interests.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Interesses</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-orkut-blue text-orkut-pink text-sm px-3 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating Statistics - Show for everyone except current user */}
              {!isCurrentUser() && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3 text-center">Avaliações Recebidas</h4>
                  <div className="text-center">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.floor(Math.random() * 50) + 20}
                        </div>
                        <div className="text-xs text-gray-600">Avaliações Positivas</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold text-orkut-pink">
                          {(Math.random() * 2 + 3.5).toFixed(1)}⭐
                        </div>
                        <div className="text-xs text-gray-600">Nota Média</div>
                      </div>
                    </div>
                    
                    {/* Top Ratings */}
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-xs text-gray-600 mb-2">Avaliações mais comuns:</div>
                      <div className="flex justify-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-500" />
                          <span className="text-xs text-gray-700">Legal (12)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Smile size={14} className="text-green-500" />
                          <span className="text-xs text-gray-700">Divertido (8)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield size={14} className="text-blue-500" />
                          <span className="text-xs text-gray-700">Confiável (6)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      Baseado nas avaliações de amigos
                    </div>
                  </div>
                </div>
              )}





              {/* Friend Rating - Only show if they are friends and not viewing own profile */}
              {!isCurrentUser() && isFriend && (
                <div className="bg-gradient-to-r from-orkut-pink/10 to-purple-100 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3 text-center">Avaliar Amigo</h4>
                
                {hasRated ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {getRatingIcon(friendRating)}
                      <span className="text-lg font-medium text-gray-700">
                        Você avaliou como: {getRatingLabel(friendRating)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setHasRated(false);
                        setFriendRating(null);
                      }}
                      className="text-sm text-orkut-pink hover:text-pink-600 transition-colors"
                    >
                      Alterar avaliação
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Avaliações Positivas */}
                    <div>
                      <h5 className="text-sm font-medium text-green-600 mb-3 text-center flex items-center justify-center space-x-1">
                        <span>✨</span>
                        <span>Qualidades Positivas</span>
                        <span>✨</span>
                      </h5>
                      <div className="grid grid-cols-3 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('legal')}
                          className="relative flex flex-col items-center p-3 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 hover:border-yellow-300 rounded-lg transition-all group"
                          title="Uma pessoa bacana e agradável"
                        >
                          <Star size={22} className="text-yellow-500 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Legal</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('confiavel')}
                          className="relative flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-all group"
                          title="Alguém em quem você pode confiar"
                        >
                          <Shield size={22} className="text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Confiável</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('sexy')}
                          className="relative flex flex-col items-center p-3 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-all group"
                          title="Pessoa atraente e charmosa"
                        >
                          <Flame size={22} className="text-red-500 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Sexy</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('divertido')}
                          className="relative flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg transition-all group"
                          title="Sempre traz alegria e diversão"
                        >
                          <Smile size={22} className="text-green-500 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Divertido</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('inteligente')}
                          className="relative flex flex-col items-center p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg transition-all group"
                          title="Pessoa muito esperta e sábia"
                        >
                          <Brain size={22} className="text-purple-500 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Inteligente</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('incrivel')}
                          className="relative flex flex-col items-center p-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 hover:border-orange-300 rounded-lg transition-all group"
                          title="Simplesmente fantástica!"
                        >
                          <Zap size={22} className="text-orange-500 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Incrível</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Avaliação Neutra */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-3 text-center flex items-center justify-center space-x-1">
                        <span>😐</span>
                        <span>Avaliação Neutra</span>
                        <span>😐</span>
                      </h5>
                      <div className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('normal')}
                          className="flex flex-col items-center p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg transition-all group"
                          title="Uma pessoa comum, sem destaque especial"
                        >
                          <Meh size={22} className="text-gray-500 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Normal</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Avaliações Negativas */}
                    <div>
                      <h5 className="text-sm font-medium text-red-600 mb-3 text-center flex items-center justify-center space-x-1">
                        <span>⚠️</span>
                        <span>Pontos Negativos</span>
                        <span>⚠️</span>
                      </h5>
                      <div className="grid grid-cols-3 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('chato')}
                          className="flex flex-col items-center p-3 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-all group"
                          title="Pessoa entediante ou sem graça"
                        >
                          <Frown size={22} className="text-red-600 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Chato</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('falso')}
                          className="flex flex-col items-center p-3 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-all group"
                          title="Não é autêntica ou sincera"
                        >
                          <ThumbsDown size={22} className="text-red-700 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Falso</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRateFriend('irritante')}
                          className="flex flex-col items-center p-3 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-all group"
                          title="Comportamento que incomoda"
                        >
                          <X size={22} className="text-red-800 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-medium text-gray-700">Irritante</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              )}



              {/* Friendship Status */}
              {!isCurrentUser() && (
                <>
                  {isFriend ? (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-green-700">
                        <UserCheck size={20} />
                        <span className="font-medium">Vocês são amigos!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                      <div className="text-center">
                        <UserPlus size={24} className="text-blue-500 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-800 mb-2">Não são amigos ainda</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Adicione {user.name} como amigo para poder avaliar e interagir mais!
                        </p>
                        <p className="text-xs text-gray-500">
                          Você pode encontrar sugestões de amigos na barra lateral direita.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Stats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <BarChart3 size={18} className="text-gray-700" />
                  <h4 className="font-semibold text-gray-800">Estatísticas</h4>
                </div>
                
                {/* Estatísticas dinâmicas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <motion.div 
                    className="text-center p-3 bg-gradient-to-br from-orkut-pink to-pink-500 text-white rounded-lg shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <FileText size={16} />
                    </div>
                    <div className="text-xl font-bold">{stats.totalPosts}</div>
                    <div className="text-xs opacity-90">
                      {stats.totalPosts === 1 ? 'Postagem' : 'Postagens'}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-3 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <Image size={16} />
                    </div>
                    <div className="text-xl font-bold">{stats.totalImages}</div>
                    <div className="text-xs opacity-90">
                      {stats.totalImages === 1 ? 'Imagem' : 'Imagens'}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-3 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-lg shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <Heart size={16} />
                    </div>
                    <div className="text-xl font-bold">{stats.totalLikes}</div>
                    <div className="text-xs opacity-90">
                      {stats.totalLikes === 1 ? 'Curtida' : 'Curtidas'}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <MessageSquare size={16} />
                    </div>
                    <div className="text-xl font-bold">{stats.totalComments}</div>
                    <div className="text-xs opacity-90">
                      {stats.totalComments === 1 ? 'Comentário' : 'Comentários'}
                    </div>
                  </motion.div>
                </div>
                
                {/* Estatísticas fixas do Orkut */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                  <motion.div 
                    className="text-center p-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <Users size={16} />
                    </div>
                    <div className="text-xl font-bold">{friendsCount}</div>
                    <div className="text-xs opacity-90">Amigos</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <Building2 size={16} />
                    </div>
                    <div className="text-xl font-bold">23</div>
                    <div className="text-xs opacity-90">Comunidades</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        duration={3000}
      />
    </motion.div>
  );
};

export default ProfileModal;