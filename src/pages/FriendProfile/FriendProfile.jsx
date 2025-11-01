import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Calendar, Users, MessageCircle, UserPlus, Camera, Video, Star } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import useAuth from '../../hooks/useAuth';

const FriendProfile = () => {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Dados de demonstração do amigo
  const friend = {
    id: friendId,
    name: 'Priscilaaaa',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop',
    bio: 'Apaixonada por música, arte e viagens! Sempre em busca de novas aventuras',
    location: 'São Paulo, SP',
    age: 25,
    relationship: 'solteira',
    mutualFriends: 485,
    totalFriends: 1247,
    isOnline: true,
    joinDate: '2008-03-15',
    interests: ['música', 'arte', 'viagens', 'fotografia', 'dança'],
    stats: {
      photos: 156,
      videos: 23,
      testimonials: 45,
      communities: 18
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
                src={friend.coverImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6 -mt-20 relative">
                {/* Profile Picture */}
                <div className="relative mb-4 md:mb-0">
                  <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-white bg-white">
                    {friend.avatar ? (
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orkut-pink to-pink-600 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {getInitials(friend.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  {friend.isOnline && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 mt-4 md:mt-16">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">{friend.name}</h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{friend.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{getRelationshipIcon(friend.relationship)}</span>
                          <span>{friend.relationship}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{friend.age} anos</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <button className="orkut-button flex items-center space-x-2">
                        <MessageCircle size={16} />
                        <span>Enviar Recado</span>
                      </button>
                      <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
                        <UserPlus size={16} />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </div>

                  {/* Bio */}
                  {friend.bio && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 italic">"{friend.bio}"</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{friend.totalFriends}</div>
                      <div className="text-sm text-gray-600">Amigos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{friend.stats.photos}</div>
                      <div className="text-sm text-gray-600">Fotos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{friend.stats.videos}</div>
                      <div className="text-sm text-gray-600">Vídeos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{friend.stats.testimonials}</div>
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
                  {friend.interests.map((interest, index) => (
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
                  Amigos em Comum ({friend.mutualFriends})
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

              {/* Member Since */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="orkut-card p-4"
              >
                <h3 className="font-bold text-gray-800 mb-3">Informações</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membro desde:</span>
                    <span className="text-gray-800">
                      {new Date(friend.joinDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`${friend.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                      {friend.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comunidades:</span>
                    <span className="text-gray-800">{friend.stats.communities}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FriendProfile;