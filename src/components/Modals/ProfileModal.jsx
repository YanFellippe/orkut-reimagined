import React from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Calendar, Heart, Users } from 'lucide-react';

const ProfileModal = ({ user, onClose }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGenderIcon = (gender) => {
    if (gender === 'masculino') return '♂️';
    if (gender === 'feminino') return '♀️';
    return '👤';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                    <span className="text-lg">{getGenderIcon(user.profile?.gender)}</span>
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
                <h4 className="font-semibold text-gray-800 mb-3">Estatísticas</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orkut-pink">156</div>
                    <div className="text-sm text-gray-600">Amigos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orkut-pink">23</div>
                    <div className="text-sm text-gray-600">Comunidades</div>
                  </div>
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