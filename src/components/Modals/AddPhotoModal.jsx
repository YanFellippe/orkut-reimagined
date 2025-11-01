import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Send } from 'lucide-react';

const AddPhotoModal = ({ user, onClose, onAddPhoto }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [album, setAlbum] = useState('perfil');
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const albums = [
    { id: 'perfil', name: 'Fotos do perfil' },
    { id: 'viagem', name: 'Viagens' },
    { id: 'amigos', name: 'Amigos' },
    { id: 'familia', name: 'Família' },
    { id: 'outros', name: 'Outros' }
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Limitar a 5 fotos por vez
    const limitedFiles = files.slice(0, 5);
    setSelectedFiles(limitedFiles);

    // Criar previews
    const newPreviews = [];
    limitedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          file,
          url: e.target.result,
          name: file.name
        });
        
        if (newPreviews.length === limitedFiles.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePreview = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      // Simular upload das fotos
      const photoData = {
        photos: previews.map((preview, index) => ({
          url: preview.url, // Em um app real, seria a URL do servidor
          name: preview.name,
          size: selectedFiles[index].size
        })),
        caption: caption.trim(),
        album,
        author: user.name
      };

      // Chamar a função para adicionar a foto como post
      onAddPhoto(photoData);
      
      // Fechar modal
      onClose();
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload das fotos. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
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
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-orkut-pink">Adicionar Fotos</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orkut-pink transition-colors duration-200"
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                if (files.length > 0) {
                  const event = { target: { files } };
                  handleFileSelect(event);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
            >
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer flex flex-col items-center space-y-3"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload size={24} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Clique para selecionar fotos
                  </p>
                  <p className="text-sm text-gray-500">
                    Ou arraste e solte aqui (máximo 5 fotos)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Formatos aceitos: JPG, PNG, GIF
                  </p>
                </div>
              </label>
            </div>

            {/* Photo Previews */}
            {previews.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Fotos selecionadas:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removePreview(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Escreva algo sobre suas fotos..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orkut-pink focus:border-orkut-pink transition-all duration-200"
                rows="3"
              />
            </div>

            {/* Album Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Álbum
              </label>
              <select
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orkut-pink focus:border-orkut-pink transition-all duration-200"
              >
                {albums.map(albumOption => (
                  <option key={albumOption.id} value={albumOption.id}>
                    {albumOption.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={selectedFiles.length === 0 || isUploading}
                className="orkut-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publicando...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Publicar Fotos</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddPhotoModal;