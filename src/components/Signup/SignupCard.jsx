import React from 'react';
import { Link } from 'react-router-dom';

const SignupCard = () => {
  return (
    <div className="orkut-card p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Ainda não tem uma conta?
      </h2>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        Junte-se ao orkut e conecte-se com seus amigos! Compartilhe fotos, 
        participe de comunidades e descubra pessoas com os mesmos interesses que você.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="w-2 h-2 bg-orkut-pink rounded-full"></span>
          <span>Conecte-se com amigos e família</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="w-2 h-2 bg-orkut-pink rounded-full"></span>
          <span>Participe de comunidades incríveis</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="w-2 h-2 bg-orkut-pink rounded-full"></span>
          <span>Compartilhe seus momentos especiais</span>
        </div>
      </div>
      
      <Link
        to="/signup"
        className="orkut-button w-full mt-6 inline-block text-center"
      >
        Criar uma conta
      </Link>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        É grátis e sempre será!
      </p>
    </div>
  );
};

export default SignupCard;