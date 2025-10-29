import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/Login/LoginForm';
import SignupCard from '../../components/Signup/SignupCard';

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Coluna Esquerda - Login */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <LoginForm />
            </div>
            
            {/* Coluna Direita - Cadastro */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <SignupCard />
            </div>
          </motion.div>
          
          {/* Seção adicional com informações do orkut */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="orkut-card p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-orkut-pink rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">♥</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Bem-vindo de volta ao orkut!
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                A rede social que marcou uma geração está de volta! 
                Reviva os bons momentos, reencontre amigos antigos e 
                faça novas conexões em um ambiente nostálgico e familiar.
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>✨ Depoimentos</span>
                <span>📸 Álbuns de fotos</span>
                <span>👥 Comunidades</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default LandingPage;