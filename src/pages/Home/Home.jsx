import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import FriendsCommunities from '../../components/FriendsCommunities/FriendsCommunitiesSidebar';
import Feed from '../../components/Feed/Feed';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // Sincronizar o usuário atual com o hook de auth
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orkut-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || !currentUser) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col w-full"
    >
      <Header 
        user={currentUser} 
        onMenuToggle={toggleSidebar}
        showMenuButton={true}
      />
      
      <div className="flex flex-1 w-full">
        {/* Navigation Sidebar - Only for mobile */}
        <div className="lg:hidden">
          <Sidebar 
            user={currentUser}
            onLogout={handleLogout}
            isOpen={sidebarOpen}
            onToggle={toggleSidebar}
          />
        </div>
        
        {/* Main Content Area */}
        <main className="full-width-layout overflow-hidden">
          <div className="w-full h-full px-1 py-1 lg:px-2 lg:py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 h-full w-full">
              {/* Profile Sidebar - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block lg:col-span-3">
                <ProfileSidebar 
                  user={currentUser} 
                  onUserUpdate={handleUserUpdate}
                />
              </div>
              
              {/* Feed - Center column */}
              <div className="col-span-1 lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Feed user={currentUser} />
                </motion.div>
              </div>

              {/* Friends & Communities Sidebar - Right column */}
              <div className="hidden lg:block lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FriendsCommunities user={currentUser} />
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default Home;