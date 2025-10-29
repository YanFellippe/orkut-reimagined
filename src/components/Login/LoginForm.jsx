import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <div className="orkut-card p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Entrar no orkut
      </h2>
      
      <div className="space-y-4 text-center">
        <p className="text-gray-600 mb-6">
          Conecte-se com seus amigos e reviva os bons momentos!
        </p>
        
        <Link
          to="/login"
          className="orkut-button w-full inline-block"
        >
          Fazer Login
        </Link>
        
        <div className="mt-4">
          <a 
            href="#" 
            className="text-sm text-orkut-dark-blue hover:text-orkut-pink transition-colors duration-200"
          >
            Não consegue acessar sua conta?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;