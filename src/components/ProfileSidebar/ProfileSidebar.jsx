import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MessageCircle, 
  Camera, 
  Video, 
  Star, 
  UserPlus,
  MapPin,
  Calendar,
  Edit3
} from 'lucide-react';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import ProfileModal from '../Modals/ProfileModal';
import MessagesModal from '../Modals/MessagesModal';
import PhotosModal from '../Modals/PhotosModal';
import VideosModal from '../Modals/VideosModal';
import TestimonialsModal from '../Modals/TestimonialsModal';

const ProfileSidebar = ({ user, onUserUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGenderIcon = (gender) => {
    return <User size={14} className="text-gray-400" />;
  };

  const getRelationshipText = (relationship) => {
    const relationships = {
      'solteiro': 'solteiro(a)',
      'solteira': 'solteiro(a)',
      'namorando': 'namorando',
      'casado': 'casado(a)',
      'casada': 'casado(a)',
      'divorciado': 'divorciado(a)',
      'divorciada': 'divorciado(a)',
      'viuvo': 'viúvo(a)',
      'viuva': 'viúvo(a)'
    };
    return relationships[relationship] || relationship;
  };

  const profileLinks = [
    { icon: User, label: 'perfil', color: 'text-blue-600', modal: 'profile' },
    { icon: MessageCircle, label: 'recados', color: 'text-green-600', modal: 'messages' },
    { icon: Camera, label: 'fotos', color: 'text-purple-600', modal: 'photos' },
    { icon: Video, label: 'vídeos', color: 'text-red-600', modal: 'videos' },
    { icon: Star, label: 'depoimentos', color: 'text-yellow-600', modal: 'testimonials' }
  ];

  const handleLinkClick = (modal) => {
    setActiveModal(modal);
  };

  const handleSaveProfile = (updatedProfile) => {
    // Atualizar o usuário no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.email === user.email 
        ? { ...u, profile: updatedProfile }
        : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Atualizar o usuário ativo
    const updatedUser = { ...user, profile: updatedProfile };
    localStorage.setItem('activeUser', JSON.stringify(updatedUser));
    
    // Notificar o componente pai
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
    
    setShowEditModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="orkut-card p-0 overflow-hidden w-full"
    >
      {/* Profile Photo */}
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-orkut-pink via-pink-400 to-purple-500 flex items-center justify-center">
          {user.profile?.avatar ? (
            <img 
              src={user.profile.avatar} 
              alt={user.name}
              className="w-32 h-32 rounded-lg object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-4xl font-bold text-orkut-pink">
                {getInitials(user.name)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-orkut-pink mb-1">
          {user.name}
        </h2>
        
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <div className="flex items-center space-x-2">
            <span>{getGenderIcon(user.profile?.gender)}</span>
            <span>{user.profile?.gender || 'não informado'}, {getRelationshipText(user.profile?.relationship || 'solteiro')}</span>
          </div>
          
          {user.profile?.location && (
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-gray-400" />
              <span>{user.profile.location}</span>
            </div>
          )}
          
          {user.profile?.age && (
            <div className="flex items-center space-x-2">
              <Calendar size={14} className="text-gray-400" />
              <span>{user.profile.age} anos</span>
            </div>
          )}
        </div>

        {/* Bio/Message */}
        {user.profile?.bio && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700 italic">
              "{user.profile.bio}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 mb-4">
          <button 
            onClick={() => setShowEditModal(true)}
            className="w-full bg-orkut-pink text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Edit3 size={16} />
            <span className="font-medium">editar perfil</span>
          </button>
          
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2">
            <UserPlus size={16} />
            <span className="font-medium">+ amigo</span>
          </button>
        </div>

        {/* Profile Links */}
        <div className="space-y-2">
          {profileLinks.map((link, index) => (
            <motion.button
              key={link.label}
              onClick={() => handleLinkClick(link.modal)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm text-left"
            >
              <link.icon size={16} className={link.color} />
              <span className="text-gray-700">{link.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Interests */}
        {user.profile?.interests && user.profile.interests.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Interesses</h4>
            <div className="flex flex-wrap gap-1">
              {user.profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-orkut-blue text-orkut-pink text-xs px-2 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showEditModal && (
        <ProfileEdit
          user={user}
          onSave={handleSaveProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {activeModal === 'profile' && (
        <ProfileModal
          user={user}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'messages' && (
        <MessagesModal
          user={user}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'photos' && (
        <PhotosModal
          user={user}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'videos' && (
        <VideosModal
          user={user}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'testimonials' && (
        <TestimonialsModal
          user={user}
          onClose={() => setActiveModal(null)}
        />
      )}
    </motion.div>
  );
};

export default ProfileSidebar;