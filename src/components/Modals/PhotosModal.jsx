import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Heart, MessageCircle, Calendar } from 'lucide-react';

const PhotosModal = ({ user, onClose }) => {
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  
  // Fotos de demonstração
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
      album: 'perfil',
      caption: 'Nova foto de perfil! 📸',
      likes: 12,
      comments: 3,
      date: '2024-01-15'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop',
      album: 'viagem',
      caption: 'Viagem incrível para a praia! 🏖️',
      likes: 25,
      comments: 8,
      date: '2024-01-10'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      album: 'amigos',
      caption: 'Encontro com a galera do trabalho 👥',
      likes: 18,
      comments: 5,
      date: '2024-01-05'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop',
      album: 'familia',
      caption: 'Almoço em família ❤️',
      likes: 30,
      comments: 12,
      date: '2023-12-25'
    }
  ];

  const albums = [
    { id: 'all', name: 'Todas as fotos', count: photos.length },
    { id: 'perfil', name: 'Fotos do perfil', count: photos.filter(p => p.album === 'perfil').length },
    { id: 'viagem', name: 'Viagens', count: photos.filter(p => p.album === 'viagem').length },
    { id: 'amigos', name: 'Amigos', count: photos.filter(p => p.album === 'amigos').length },
    { id: 'familia', name: 'Família', count: photos.filter(p => p.album === 'familia').length }
  ];

  const filteredPhotos = selectedAlbum === 'all' 
    ? photos 
    : photos.filter(photo => photo.album === selectedAlbum);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-orkut-pink">Fotos de {user.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Albums Sidebar */}
          <div className="w-64 bg-gray-50 p-4 border-r border-gray-200">
            <div className="mb-4">
              <button className="w-full orkut-button flex items-center justify-center space-x-2">
                <Upload size={16} />
                <span>Adicionar Fotos</span>
              </button>
            </div>

            <div className="space-y-2">
              {albums.map(album => (
                <button
                  key={album.id}
                  onClick={() => setSelectedAlbum(album.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    selectedAlbum === album.id
                      ? 'bg-orkut-pink text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{album.name}</span>
                    <span className="text-sm opacity-75">({album.count})</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Photos Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            {filteredPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    <div className="p-3">
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{photo.caption}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart size={12} />
                            <span>{photo.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle size={12} />
                            <span>{photo.comments}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{new Date(photo.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Upload size={48} className="mb-4" />
                <p className="text-lg font-medium mb-2">Nenhuma foto encontrada</p>
                <p className="text-sm">Adicione suas primeiras fotos para começar!</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotosModal;