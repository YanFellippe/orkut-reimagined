import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário ativo no localStorage
    try {
      const activeUser = localStorage.getItem('activeUser');
      if (activeUser) {
        const parsedUser = JSON.parse(activeUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      localStorage.removeItem('activeUser');
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      localStorage.setItem('activeUser', JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true };
    }
    
    return { success: false, error: 'E-mail ou senha incorretos' };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar se o e-mail já existe
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'E-mail já cadastrado' };
    }

    const newUser = { 
      name, 
      email, 
      password,
      profile: {
        bio: '',
        gender: '',
        relationship: 'solteiro',
        location: '',
        age: null,
        avatar: null,
        interests: []
      }
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('activeUser');
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };
};

export default useAuth;