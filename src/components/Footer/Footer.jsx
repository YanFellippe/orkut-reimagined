import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <a 
            href="#" 
            className="hover:text-orkut-pink transition-colors duration-200"
          >
            Ajuda
          </a>
          <a 
            href="#" 
            className="hover:text-orkut-pink transition-colors duration-200"
          >
            Privacidade
          </a>
          <a 
            href="#" 
            className="hover:text-orkut-pink transition-colors duration-200"
          >
            Termos
          </a>
        </div>
        
        <div className="text-center mt-4 text-xs text-gray-500">
          © 2024 orkut - Conectando pessoas desde sempre
        </div>
      </div>
    </footer>
  );
};

export default Footer;