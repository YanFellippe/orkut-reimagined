import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Camera, Upload } from 'lucide-react';

const ProfileEdit = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    bio: user.profile?.bio || '',
    gender: user.profile?.gender || '',
    relationship: user.profile?.relationship || 'solteiro',
    location: user.profile?.location || '',
    age: user.profile?.age || '',
    interests: user.profile?.interests?.join(', ') || '',
    avatar: user.profile?.avatar || null
  });
  
  const fileInputRef = useRef(null);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Verificar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          avatar: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData({
      ...formData,
      avatar: null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProfile = {
      ...user.profile,
      bio: formData.bio,
      gender: formData.gender,
      relationship: formData.relationship,
      location: formData.location,
      age: formData.age ? parseInt(formData.age) : null,
      avatar: formData.avatar,
      interests: formData.interests
        .split(',')
        .map(interest => interest.trim())
        .filter(interest => interest.length > 0)
    };

    onSave(updatedProfile);
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
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Editar Perfil</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Foto de Perfil
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orkut-pink via-pink-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                  {formData.avatar ? (
                    <img 
                      src={formData.avatar} 
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {getInitials(user.name)}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Camera size={16} />
                    <span>Escolher Foto</span>
                  </button>
                  
                  {formData.avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      <X size={16} />
                      <span>Remover</span>
                    </button>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biografia/Recado
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Conte um pouco sobre você..."
                className="orkut-input resize-none"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sexo
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="orkut-input"
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado Civil
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="orkut-input"
              >
                <option value="solteiro">Solteiro(a)</option>
                <option value="namorando">Namorando</option>
                <option value="casado">Casado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localização
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Cidade, Estado, País"
                className="orkut-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Idade
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Sua idade"
                min="13"
                max="120"
                className="orkut-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interesses
              </label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="música, arte, viagens (separados por vírgula)"
                className="orkut-input"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separe os interesses por vírgula
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 orkut-button flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>Salvar</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileEdit;