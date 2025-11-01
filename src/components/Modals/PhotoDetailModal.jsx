import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart, MessageCircle, Calendar, User } from 'lucide-react';

const PhotoDetailModal = ({ photo, user, onClose, onLike }) => {
  if (!photo) return null;

  const handleLike = () => {
    onLike(photo.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <img
            src={photo.url}
            alt={photo.caption}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Sidebar com detalhes */}
        <div className="w-80 bg-white flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Detalhes da Foto</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 p-4 space-y-4">
            {/* Autor */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {photo.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{photo.author}</p>
                <p className="text-sm text-gray-500 flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{new Date(photo.date).toLocaleDateString('pt-BR')}</span>
                </p>
              </div>
            </div>

            {/* Caption */}
            {photo.caption && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Descrição</h4>
                <p className="text-gray-600 leading-relaxed">{photo.caption}</p>
              </div>
            )}

            {/* Álbum */}
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Álbum</h4>
              <p className="text-sm text-gray-600 capitalize">
                📁 {photo.album}
              </p>
            </div>

            {/* Estatísticas */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Interações</h4>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    photo.likedBy?.includes(user.email)
                      ? 'bg-orkut-pink text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart 
                    size={16} 
                    fill={photo.likedBy?.includes(user.email) ? 'currentColor' : 'none'}
                  />
                  <span className="text-sm font-medium">{photo.likes} curtidas</span>
                </button>

                <div className="flex items-center space-x-1 text-gray-500">
                  <MessageCircle size={16} />
                  <span className="text-sm">{photo.comments} comentários</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoDetailModal;