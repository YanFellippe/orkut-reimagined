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
  Building2
} from 'lucide-react';

const ProfileModal = ({ user, onClose }) => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalImages: 0,
    totalLikes: 0,
    totalComments: 0
  });

  // Calcular estatísticas
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

    calculateStats();

    // Recalcular quando houver mudanças
    const interval = setInterval(calculateStats, 2000);
    return () => clearInterval(interval);
  }, [user.email]);
  
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
            <h2 className="text-2xl font-bold text-orkut-pink">Perfil de {user.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
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
                    <span className="text-gray-700">156 amigos</span>
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
                    <div className="text-xl font-bold">156</div>
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
    </motion.div>
  );
};

export default ProfileModal;