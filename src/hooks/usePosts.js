import { useState, useEffect } from 'react';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Posts iniciais de demonstração
  const initialPosts = [
    {
      id: 1,
      author: 'Maria Silva',
      content: 'Que saudade do orkut! Finalmente de volta! 💖',
      timestamp: '2 horas atrás',
      likes: 15,
      comments: 3,
      likedBy: []
    },
    {
      id: 2,
      author: 'João Santos',
      content: 'Alguém lembra das comunidades? "Eu odeio acordar cedo" era a melhor! 😂',
      timestamp: '4 horas atrás',
      likes: 23,
      comments: 8,
      likedBy: []
    },
    {
      id: 3,
      author: 'Ana Costa',
      content: 'Quem mais sente falta dos scraps? Era muito mais divertido que os stories de hoje! 📝✨',
      timestamp: '6 horas atrás',
      likes: 31,
      comments: 12,
      likedBy: []
    }
  ];

  // Carregar posts do localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('orkutPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem('orkutPosts', JSON.stringify(initialPosts));
    }
    setLoading(false);
  }, []);

  // Salvar posts no localStorage sempre que houver mudanças
  useEffect(() => {
    if (!loading && posts.length > 0) {
      localStorage.setItem('orkutPosts', JSON.stringify(posts));
    }
  }, [posts, loading]);

  // Função para criar um novo post
  const createPost = (content, author) => {
    const newPost = {
      id: Date.now(),
      author: author,
      content: content,
      timestamp: formatTimestamp(new Date()),
      likes: 0,
      comments: 0,
      likedBy: []
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
    return newPost;
  };

  // Função para curtir/descurtir um post
  const toggleLike = (postId, userEmail) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const likedBy = post.likedBy || [];
          const userAlreadyLiked = likedBy.includes(userEmail);
          
          if (userAlreadyLiked) {
            return {
              ...post,
              likes: Math.max(0, post.likes - 1),
              likedBy: likedBy.filter(email => email !== userEmail)
            };
          } else {
            return {
              ...post,
              likes: post.likes + 1,
              likedBy: [...likedBy, userEmail]
            };
          }
        }
        return post;
      })
    );
  };

  // Função para deletar um post (apenas o autor pode deletar)
  const deletePost = (postId, userEmail) => {
    setPosts(prevPosts => 
      prevPosts.filter(post => {
        if (post.id === postId) {
          // Verificar se o usuário é o autor do post
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const author = users.find(u => u.email === userEmail);
          return !(author && post.author === author.name);
        }
        return true;
      })
    );
  };

  // Função para formatar timestamp
  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'agora';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    deletePost
  };
};

export default usePosts;