import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Send, Heart } from 'lucide-react';

const TestimonialsModal = ({ user, onClose }) => {
  const [newTestimonial, setNewTestimonial] = useState('');
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      author: 'Ana Costa',
      content: 'Uma pessoa incrível! Sempre disposta a ajudar e com um coração gigante. Tenho muito orgulho de ter você como amiga! ❤️',
      rating: 5,
      date: '2024-01-15',
      likes: 8
    },
    {
      id: 2,
      author: 'João Santos',
      content: 'Profissional exemplar e pessoa ainda melhor! Trabalhar com você foi uma das melhores experiências da minha carreira. Sucesso sempre! 🚀',
      rating: 5,
      date: '2024-01-10',
      likes: 12
    },
    {
      id: 3,
      author: 'Maria Silva',
      content: 'Amiga de todas as horas! Sempre presente nos momentos bons e ruins. Você é especial e merece todo o carinho do mundo! 🌟',
      rating: 5,
      date: '2024-01-05',
      likes: 15
    }
  ]);

  const handleSubmitTestimonial = (e) => {
    e.preventDefault();
    if (newTestimonial.trim()) {
      const testimonial = {
        id: Date.now(),
        author: 'Você',
        content: newTestimonial,
        rating: 5,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setTestimonials([testimonial, ...testimonials]);
      setNewTestimonial('');
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
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
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-orkut-pink">Depoimentos de {user.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* New Testimonial Form */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSubmitTestimonial}>
            <textarea
              value={newTestimonial}
              onChange={(e) => setNewTestimonial(e.target.value)}
              placeholder="Escreva um depoimento..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orkut-pink focus:border-orkut-pink transition-all duration-200"
              rows="3"
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Avaliação:</span>
                <div className="flex space-x-1">
                  {renderStars(5)}
                </div>
              </div>
              <button
                type="submit"
                disabled={!newTestimonial.trim()}
                className="orkut-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                <span>Enviar Depoimento</span>
              </button>
            </div>
          </form>
        </div>

        {/* Testimonials List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-l-4 border-yellow-400"
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {getInitials(testimonial.author)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(testimonial.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">{testimonial.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200">
                      <Heart size={16} />
                      <span className="text-sm">{testimonial.likes}</span>
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

export default TestimonialsModal;