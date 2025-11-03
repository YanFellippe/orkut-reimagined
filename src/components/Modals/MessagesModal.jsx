import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Heart, Reply } from 'lucide-react';

const MessagesModal = ({ user, onClose }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'Ana Costa',
      content: 'Oi! Como você está? Saudades dos tempos de orkut!',
      timestamp: '2 horas atrás',
      likes: 3
    },
    {
      id: 2,
      author: 'João Santos',
      content: 'Que legal te ver aqui novamente! Vamos marcar um encontro da galera?',
      timestamp: '1 dia atrás',
      likes: 5
    },
    {
      id: 3,
      author: 'Maria Silva',
      content: 'Parabéns pelo novo emprego! Você merece muito!',
      timestamp: '3 dias atrás',
      likes: 8
    }
  ]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        author: 'Você',
        content: newMessage,
        timestamp: 'agora',
        likes: 0
      };
      setMessages([message, ...messages]);
      setNewMessage('');
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col mx-4"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-orkut-pink">Recados de {user.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* New Message Form */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSubmitMessage}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Deixe um recado..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orkut-pink focus:border-orkut-pink transition-all duration-200"
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="orkut-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                <span>Enviar Recado</span>
              </button>
            </div>
          </form>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {getInitials(message.author)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800">{message.author}</h4>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{message.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-orkut-pink transition-colors duration-200">
                      <Heart size={16} />
                      <span className="text-sm">{message.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-orkut-pink transition-colors duration-200">
                      <Reply size={16} />
                      <span className="text-sm">Responder</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MessagesModal;