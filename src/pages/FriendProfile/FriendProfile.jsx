import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Calendar, Users, MessageCircle, UserPlus, UserCheck, UserMinus, Camera, Video, Star, Shield, Flame, Smile, Brain, Zap, Meh, Frown, ThumbsDown, X } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileModal from '../../components/Modals/ProfileModal';
import useAuth from '../../hooks/useAuth';
import { demoFriends, friendSuggestions } from '../../utils/demoData';
import { notifyFriendshipChange } from '../../utils/friendshipUtils';

// Componente para avaliação de amigos
const FriendRatingWidget = ({ friendData }) => {
  const [friendRating, setFriendRating] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  // Carregar avaliação existente
  useEffect(() => {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentUserIdentifier = currentUserData.email || currentUserData.name || 'user';
    const ratings = JSON.parse(localStorage.getItem('friendRatings') || '{}');
    
    const userIdentifier = friendData.email || friendData.name;
    const ratingKey = `${currentUserIdentifier}_${userIdentifier}`;
    
    if (ratings[ratingKey]) {
      setFriendRating(ratings[ratingKey]);
      setHasRated(true);
    }
  }, [friendData]);

  const handleRateFriend = (rating) => {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const currentUserIdentifier = currentUserData.email || currentUserData.name || 'user';
    const ratings = JSON.parse(localStorage.getItem('friendRatings') || '{}');
    
    const userIdentifier = friendData.email || friendData.name;
    const ratingKey = `${currentUserIdentifier}_${userIdentifier}`;
    
    ratings[ratingKey] = rating;
    localStorage.setItem('friendRatings', JSON.stringify(ratings));
    
    setFriendRating(rating);
    setHasRated(true);
  };

  const getRatingIcon = (rating) => {
    switch (rating) {
      case 'legal': return <Star size={16} className="text-yellow-500" />;
      case 'confiavel': return <Shield size={16} className="text-blue-500" />;
      case 'sexy': return <Flame size={16} className="text-red-500" />;
      case 'divertido': return <Smile size={16} className="text-green-500" />;
      case 'inteligente': return <Brain size={16} className="text-purple-500" />;
      case 'incrivel': return <Zap size={16} className="text-orange-500" />;
      case 'normal': return <Meh size={16} className="text-gray-500" />;
      case 'chato': return <Frown size={16} className="text-red-600" />;
      case 'falso': return <ThumbsDown size={16} className="text-red-700" />;
      case 'irritante': return <X size={16} className="text-red-800" />;
      default: return null;
    }
  };

  const getRatingLabel = (rating) => {
    const labels = {
      legal: 'Legal', confiavel: 'Confiável', sexy: 'Sexy',
      divertido: 'Divertido', inteligente: 'Inteligente', incrivel: 'Incrível',
      normal: 'Normal', chato: 'Chato', falso: 'Falso', irritante: 'Irritante'
    };
    return labels[rating] || '';
  };

  if (hasRated) {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {getRatingIcon(friendRating)}
          <span className="text-sm font-medium text-gray-700">
            Você avaliou como: {getRatingLabel(friendRating)}
          </span>
        </div>
        <button
          onClick={() => {
            setHasRated(false);
            setFriendRating(null);
          }}
          className="text-xs text-orkut-pink hover:text-pink-600 transition-colors"
        >
          Alterar avaliação
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Avaliações Positivas */}
      <div>
        <h5 className="text-xs font-medium text-green-600 mb-2 text-center">✨ Qualidades Positivas ✨</h5>
        <div className="grid grid-cols-3 gap-1">
          {[
            { key: 'legal', icon: Star, color: 'yellow', label: 'Legal' },
            { key: 'confiavel', icon: Shield, color: 'blue', label: 'Confiável' },
            { key: 'sexy', icon: Flame, color: 'red', label: 'Sexy' },
            { key: 'divertido', icon: Smile, color: 'green', label: 'Divertido' },
            { key: 'inteligente', icon: Brain, color: 'purple', label: 'Inteligente' },
            { key: 'incrivel', icon: Zap, color: 'orange', label: 'Incrível' }
          ].map((item) => (
            <motion.button
              key={item.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRateFriend(item.key)}
              className={`flex flex-col items-center p-2 bg-${item.color}-50 hover:bg-${item.color}-100 border border-${item.color}-200 hover:border-${item.color}-300 rounded-lg transition-all text-center`}
            >
              <item.icon size={16} className={`text-${item.color}-500 mb-1`} />
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Avaliação Neutra */}
      <div>
        <h5 className="text-xs font-medium text-gray-600 mb-2 text-center">😐 Avaliação Neutra 😐</h5>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleRateFriend('normal')}
            className="flex flex-col items-center p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg transition-all"
          >
            <Meh size={16} className="text-gray-500 mb-1" />
            <span className="text-xs font-medium text-gray-700">Normal</span>
          </motion.button>
        </div>
      </div>

      {/* Avaliações Negativas */}
      <div>
        <h5 className="text-xs font-medium text-red-600 mb-2 text-center">⚠️ Pontos Negativos ⚠️</h5>
        <div className="grid grid-cols-3 gap-1">
          {[
            { key: 'chato', icon: Frown, label: 'Chato' },
            { key: 'falso', icon: ThumbsDown, label: 'Falso' },
            { key: 'irritante', icon: X, label: 'Irritante' }
          ].map((item) => (
            <motion.button
              key={item.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRateFriend(item.key)}
              className="flex flex-col items-center p-2 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-all text-center"
            >
              <item.icon size={16} className="text-red-600 mb-1" />
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FriendProfile = () => {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Buscar o amigo correto pelos dados demo ou sugestões
  const friend = demoFriends.find(f => f.id === parseInt(friendId)) || 
                 friendSuggestions.find(f => f.id === parseInt(friendId));

  // Converter dados demo para formato esperado (mesmo se friend for null)
  const friendData = friend ? {
    id: friend.id,
    name: friend.name,
    email: `${friend.name.toLowerCase().replace(/\s+/g, '')}@orkut.com`, // Email fictício
    avatar: friend.avatar,
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop',
    bio: `Olá! Sou ${friend.name} de ${friend.location}. Sempre conectado no Orkut!`,
    location: friend.location,
    age: Math.floor(Math.random() * 15) + 18, // Idade aleatória entre 18-32
    relationship: friend.relationship,
    mutualFriends: friend.mutualFriends,
    totalFriends: Math.floor(Math.random() * 1000) + 500,
    isOnline: friend.isOnline,
    joinDate: '2008-03-15',
    interests: ['música', 'arte', 'viagens', 'fotografia', 'dança'],
    stats: {
      photos: Math.floor(Math.random() * 200) + 50,
      videos: Math.floor(Math.random() * 50) + 10,
      testimonials: Math.floor(Math.random() * 100) + 20,
      communities: Math.floor(Math.random() * 30) + 5
    },
    profile: {
      avatar: friend.avatar,
      bio: `Olá! Sou ${friend.name} de ${friend.location}. Sempre conectado no Orkut!`,
      location: friend.location,
      relationship: friend.relationship,
      age: Math.floor(Math.random() * 15) + 18,
      interests: ['música', 'arte', 'viagens', 'fotografia', 'dança']
    }
  } : null;

  // Verificar status de amizade
  useEffect(() => {
    if (!friendData) return; // Early return se não há dados do amigo
    
    const checkFriendshipStatus = () => {
      const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
      const userIdentifier = friendData.email || `user_${friendData.id}` || friendData.name;
      
      // Verificar se o usuário está nos dados demo ou sugestões (por ID ou nome)
      const isInDemoFriends = demoFriends.some(f => 
        f.id === friendData.id || f.name === friendData.name
      );
      const isInSuggestions = friendSuggestions.some(f => 
        f.id === friendData.id || f.name === friendData.name
      );
      
      // Verificar no sistema de amizades personalizado
      const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
      const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
      const reverseFriendshipKey = `${userIdentifier}_${currentUserEmail}`;
      
      // Verificar se foi removido dos dados demo
      const wasRemovedFromDemo = friendships[friendshipKey]?.status === 'removed' && 
                                 friendships[friendshipKey]?.source === 'demo';
      
      // Verificar se foi adicionado manualmente ou de sugestão
      const wasAddedManually = (friendships[friendshipKey]?.status === 'friends' && 
                               (friendships[friendshipKey]?.source === 'manual' || friendships[friendshipKey]?.source === 'suggestion')) ||
                              (friendships[reverseFriendshipKey]?.status === 'friends' && 
                               (friendships[reverseFriendshipKey]?.source === 'manual' || friendships[reverseFriendshipKey]?.source === 'suggestion'));
      
      // São amigos se: está nos dados demo E não foi removido, OU foi adicionado manualmente
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
        setIsFriend(true);
      }
    };

    checkFriendshipStatus();
  }, [friendData?.id, friendData?.name, friendData?.email]);

  const handleAddFriend = async () => {
    setIsLoading(true);
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    const userIdentifier = friendData.email || `user_${friendData.id}` || friendData.name;
    
    const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
    const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
    
    // Adicionar amizade bidirecional
    // Determinar a fonte baseado se é sugestão ou manual
    const isFromSuggestions = friendSuggestions.some(f => 
      f.id === friendData.id || f.name === friendData.name
    );
    const source = isFromSuggestions ? 'suggestion' : 'manual';
    
    friendships[friendshipKey] = {
      addedAt: new Date().toISOString(),
      status: 'friends',
      source: source
    };
    
    // Também adicionar na direção reversa para garantir consistência
    const reverseFriendshipKey = `${userIdentifier}_${currentUserEmail}`;
    friendships[reverseFriendshipKey] = {
      addedAt: new Date().toISOString(),
      status: 'friends',
      source: source
    };
    
    localStorage.setItem('friendships', JSON.stringify(friendships));
    
    // Disparar evento para atualizar outras partes da interface
    notifyFriendshipChange();
    
    // Simular delay de rede
    setTimeout(() => {
      setIsFriend(true);
      setIsLoading(false);
    }, 500);
  };

  const handleRemoveFriend = async () => {
    setIsLoading(true);
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
    const userIdentifier = friendData.email || `user_${friendData.id}` || friendData.name;
    const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
    
    const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
    const reverseFriendshipKey = `${userIdentifier}_${currentUserEmail}`;
    
    // Verificar se era dos dados demo ou sugestões
    const wasInDemo = demoFriends.some(f => 
      f.name === friendData.name || f.id === friendData.id
    );
    const wasInSuggestions = friendSuggestions.some(f => 
      f.name === friendData.name || f.id === friendData.id
    );
    
    // Se era dos dados demo, não pode remover completamente, apenas marcar como removido
    if (wasInDemo) {
      friendships[friendshipKey] = {
        addedAt: new Date().toISOString(),
        status: 'removed',
        source: 'demo'
      };
    } else {
      // Se foi adicionado manualmente, pode remover completamente
      delete friendships[friendshipKey];
      delete friendships[reverseFriendshipKey];
    }
    
    localStorage.setItem('friendships', JSON.stringify(friendships));
    
    // Disparar evento para atualizar outras partes da interface
    notifyFriendshipChange();
    
    // Também remover avaliação se existir
    const ratings = JSON.parse(localStorage.getItem('friendRatings') || '{}');
    const ratingKey = `${currentUserEmail}_${userIdentifier}`;
    delete ratings[ratingKey];
    localStorage.setItem('friendRatings', JSON.stringify(ratings));
    
    // Simular delay de rede
    setTimeout(() => {
      setIsFriend(false);
      setIsLoading(false);
    }, 500);
  };

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

  // Se não encontrar o amigo, mostrar erro
  if (!friend || !friendData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header user={user} />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Amigo não encontrado</h1>
            <button
              onClick={() => navigate('/home')}
              className="orkut-button"
            >
              Voltar ao início
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      
      <main className="flex-1 bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-orkut-pink hover:text-pink-600 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto p-4">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="orkut-card overflow-hidden mb-6"
          >
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-orkut-pink to-purple-500 relative overflow-hidden">
              <img
                src={friendData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6 -mt-20 relative">
                {/* Profile Picture */}
                <div className="relative mb-4 md:mb-0">
                  <div 
                    className="w-32 h-32 rounded-xl overflow-hidden border-4 border-white bg-white cursor-pointer hover:ring-2 hover:ring-orkut-pink transition-all"
                    onClick={() => setShowProfileModal(true)}
                  >
                    {friendData.avatar ? (
                      <img
                        src={friendData.avatar}
                        alt={friendData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orkut-pink to-pink-600 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {getInitials(friendData.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  {friendData.isOnline && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 mt-4 md:mt-16">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">{friendData.name}</h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{friendData.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{getRelationshipIcon(friendData.relationship)}</span>
                          <span>{friendData.relationship}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{friendData.age} anos</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <button className="orkut-button flex items-center space-x-2">
                        <MessageCircle size={16} />
                        <span>Enviar Recado</span>
                      </button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={isFriend ? handleRemoveFriend : handleAddFriend}
                        disabled={isLoading}
                        className={`font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                          isFriend 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : isFriend ? (
                          <>
                            <UserMinus size={16} />
                            <span>Remover Amigo</span>
                          </>
                        ) : (
                          <>
                            <UserPlus size={16} />
                            <span>Adicionar Amigo</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Bio */}
                  {friendData.bio && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 italic">"{friendData.bio}"</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{friendData.totalFriends}</div>
                      <div className="text-sm text-gray-600">Amigos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{friendData.stats.photos}</div>
                      <div className="text-sm text-gray-600">Fotos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{friendData.stats.videos}</div>
                      <div className="text-sm text-gray-600">Vídeos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{friendData.stats.testimonials}</div>
                      <div className="text-sm text-gray-600">Depoimentos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Navigation Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="orkut-card p-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { icon: Camera, label: 'fotos', color: 'text-purple-600' },
                    { icon: Video, label: 'vídeos', color: 'text-red-600' },
                    { icon: Star, label: 'depoimentos', color: 'text-yellow-600' },
                    { icon: Users, label: 'amigos', color: 'text-blue-600' },
                    { icon: MessageCircle, label: 'recados', color: 'text-green-600' }
                  ].map((item, index) => (
                    <button
                      key={item.label}
                      className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <item.icon size={24} className={item.color} />
                      <span className="text-sm text-gray-700 mt-1">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="orkut-card p-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">Atividade Recente</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Camera size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Adicionou 5 novas fotos no álbum "Viagem"</p>
                      <p className="text-xs text-gray-500">2 horas atrás</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Respondeu a um recado de Ana Costa</p>
                      <p className="text-xs text-gray-500">1 dia atrás</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="orkut-card p-4"
              >
                <h3 className="font-bold text-gray-800 mb-3">Interesses</h3>
                <div className="flex flex-wrap gap-2">
                  {friendData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-orkut-blue text-orkut-pink text-sm px-3 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Mutual Friends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="orkut-card p-4"
              >
                <h3 className="font-bold text-gray-800 mb-3">
                  Amigos em Comum ({friendData.mutualFriends})
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-lg mx-auto mb-1 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {String.fromCharCode(65 + i)}{String.fromCharCode(65 + i + 1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 truncate">
                        Amigo {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 text-sm text-orkut-pink hover:underline">
                  Ver todos
                </button>
              </motion.div>

              {/* Friend Rating - Only show if they are friends */}
              {isFriend && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="orkut-card p-4"
                >
                  <h3 className="font-bold text-gray-800 mb-3">Avaliar Amigo</h3>
                  <FriendRatingWidget friendData={friendData} />
                </motion.div>
              )}

              {/* Member Since */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="orkut-card p-4"
              >
                <h3 className="font-bold text-gray-800 mb-3">Informações</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membro desde:</span>
                    <span className="text-gray-800">
                      {new Date(friendData.joinDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`${friendData.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                      {friendData.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comunidades:</span>
                    <span className="text-gray-800">{friendData.stats.communities}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          user={friendData}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default FriendProfile;