import React from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Play, Heart, MessageCircle, Calendar } from 'lucide-react';

const VideosModal = ({ user, onClose }) => {
  // Vídeos de demonstração
  const videos = [
    {
      id: 1,
      title: 'Viagem para a praia 🏖️',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop',
      duration: '2:34',
      likes: 15,
      comments: 4,
      date: '2024-01-15',
      views: 89
    },
    {
      id: 2,
      title: 'Aniversário da família 🎂',
      thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop',
      duration: '1:45',
      likes: 28,
      comments: 12,
      date: '2024-01-10',
      views: 156
    },
    {
      id: 3,
      title: 'Show da banda favorita 🎵',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      duration: '4:12',
      likes: 42,
      comments: 18,
      date: '2024-01-05',
      views: 234
    }
  ];

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
            <h2 className="text-2xl font-bold text-orkut-pink">Vídeos de {user.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <button className="orkut-button flex items-center space-x-2">
              <Upload size={16} />
              <span>Adicionar Vídeo</span>
            </button>
          </div>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play size={24} className="text-orkut-pink ml-1" />
                      </div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{video.views} visualizações</span>
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{new Date(video.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Heart size={14} />
                        <span>{video.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={14} />
                        <span>{video.comments}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Upload size={48} className="mb-4" />
              <p className="text-lg font-medium mb-2">Nenhum vídeo encontrado</p>
              <p className="text-sm">Adicione seus primeiros vídeos para começar!</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideosModal;