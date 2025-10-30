import { useState, useEffect, useCallback } from 'react';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para formatar timestamp relativo (ex: "2h atrás")
  const formatTimestamp = useCallback(date => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'agora';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;

    return date.toLocaleDateString('pt-BR');
  }, []);

  // Função para formatar timestamp completo (ex: "30/10/2024 às 14:35")
  const formatFullTimestamp = useCallback(date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }, []);

  // Posts iniciais de demonstração
  const getInitialPosts = useCallback(() => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000);
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
    const thirtyMinAgo = new Date(now.getTime() - 30 * 60 * 1000);
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    const fifteenMinAgo = new Date(now.getTime() - 15 * 60 * 1000);
    const fortyFiveMinAgo = new Date(now.getTime() - 45 * 60 * 1000);
    const twoAndHalfHoursAgo = new Date(now.getTime() - 2.5 * 60 * 60 * 1000);
    const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000);
    const tenMinAgo = new Date(now.getTime() - 10 * 60 * 1000);

    return [
      {
        id: 1,
        author: 'Maria Silva',
        content: 'Que saudade do orkut! Finalmente de volta! 💖',
        timestamp: formatTimestamp(twoHoursAgo),
        createdAt: twoHoursAgo.toISOString(),
        fullTimestamp: formatFullTimestamp(twoHoursAgo),
        likes: 15,
        comments: 5,
        likedBy: [],
        commentsList: [
          {
            id: 1,
            author: 'João Santos',
            content: 'Também sinto muita saudade! 😍',
            timestamp: formatTimestamp(oneHourAgo),
            createdAt: oneHourAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(oneHourAgo),
          },
          {
            id: 2,
            author: 'Ana Costa',
            content: 'Melhor rede social que já existiu!',
            timestamp: formatTimestamp(thirtyMinAgo),
            createdAt: thirtyMinAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(thirtyMinAgo),
          },
          {
            id: 3,
            author: 'Pedro Oliveira',
            content:
              'Verdade! Lembro de ficar horas navegando nas comunidades 🥺',
            timestamp: formatTimestamp(fortyFiveMinAgo),
            createdAt: fortyFiveMinAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(fortyFiveMinAgo),
          },
          {
            id: 4,
            author: 'Carla Mendes',
            content: 'Os depoimentos eram tudo! ❤️',
            timestamp: formatTimestamp(fifteenMinAgo),
            createdAt: fifteenMinAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(fifteenMinAgo),
          },
          {
            id: 5,
            author: 'Lucas Ferreira',
            content: 'Quem lembra do "Quem sou eu"? Era viciante! 😂',
            timestamp: formatTimestamp(tenMinAgo),
            createdAt: tenMinAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(tenMinAgo),
          },
        ],
      },
      {
        id: 2,
        author: 'João Santos',
        content:
          'Alguém lembra das comunidades? "Eu odeio acordar cedo" era a melhor! 😂',
        timestamp: formatTimestamp(fourHoursAgo),
        createdAt: fourHoursAgo.toISOString(),
        fullTimestamp: formatFullTimestamp(fourHoursAgo),
        likes: 23,
        comments: 4,
        likedBy: [],
        commentsList: [
          {
            id: 1,
            author: 'Maria Silva',
            content: 'Hahaha eu era membro dessa! 😂',
            timestamp: formatTimestamp(threeHoursAgo),
            createdAt: threeHoursAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(threeHoursAgo),
          },
          {
            id: 2,
            author: 'Ana Costa',
            content: '"Eu amo dormir até tarde" também era boa! 😴',
            timestamp: formatTimestamp(twoAndHalfHoursAgo),
            createdAt: twoAndHalfHoursAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(twoAndHalfHoursAgo),
          },
          {
            id: 3,
            author: 'Rafael Lima',
            content: 'E a "Eu odeio segunda-feira"? Clássica! 🙄',
            timestamp: formatTimestamp(oneHourAgo),
            createdAt: oneHourAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(oneHourAgo),
          },
          {
            id: 4,
            author: 'Juliana Rocha',
            content: 'As comunidades de fãs de bandas eram as melhores! 🎵',
            timestamp: formatTimestamp(thirtyMinAgo),
            createdAt: thirtyMinAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(thirtyMinAgo),
          },
        ],
      },
      {
        id: 3,
        author: 'Ana Costa',
        content:
          'Quem mais sente falta dos scraps? Era muito mais divertido que os stories de hoje! 📝✨',
        timestamp: formatTimestamp(sixHoursAgo),
        createdAt: sixHoursAgo.toISOString(),
        fullTimestamp: formatFullTimestamp(sixHoursAgo),
        likes: 31,
        comments: 6,
        likedBy: [],
        commentsList: [
          {
            id: 1,
            author: 'Bruno Alves',
            content: 'Verdade! Os scraps tinham muito mais personalidade 💯',
            timestamp: formatTimestamp(fiveHoursAgo),
            createdAt: fiveHoursAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(fiveHoursAgo),
          },
          {
            id: 2,
            author: 'Camila Santos',
            content: 'Eu decorava códigos HTML só pra fazer scraps bonitos! 🤓',
            timestamp: formatTimestamp(fourHoursAgo),
            createdAt: fourHoursAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(fourHoursAgo),
          },
          {
            id: 3,
            author: 'Diego Martins',
            content: 'E as imagens animadas? Era uma arte! ✨',
            timestamp: formatTimestamp(threeHoursAgo),
            createdAt: threeHoursAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(threeHoursAgo),
          },
          {
            id: 4,
            author: 'Fernanda Costa',
            content: 'Saudades de quando a internet era mais divertida 🥲',
            timestamp: formatTimestamp(twoHoursAgo),
            createdAt: twoHoursAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(twoHoursAgo),
          },
          {
            id: 5,
            author: 'Gabriel Silva',
            content: 'Os scraps de aniversário eram tradição! 🎂',
            timestamp: formatTimestamp(oneHourAgo),
            createdAt: oneHourAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(oneHourAgo),
          },
          {
            id: 6,
            author: 'Helena Ribeiro',
            content:
              'Quem lembra dos scraps em corrente? "Mande para 10 amigos" 😅',
            timestamp: formatTimestamp(fortyFiveMinAgo),
            createdAt: fortyFiveMinAgo.toISOString(),
            fullTimestamp: formatFullTimestamp(fortyFiveMinAgo),
          },
        ],
      },
    ];
  }, [formatTimestamp, formatFullTimestamp]);

  // Carregar posts do localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('orkutPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const initialPosts = getInitialPosts();
      setPosts(initialPosts);
      localStorage.setItem('orkutPosts', JSON.stringify(initialPosts));
    }
    setLoading(false);
  }, [getInitialPosts]);

  // Salvar posts no localStorage sempre que houver mudanças
  useEffect(() => {
    if (!loading && posts.length > 0) {
      localStorage.setItem('orkutPosts', JSON.stringify(posts));
    }
  }, [posts, loading]);

  // Função para criar um novo post
  const createPost = (content, author) => {
    const now = new Date();
    const newPost = {
      id: Date.now(),
      author: author,
      content: content,
      timestamp: formatTimestamp(now),
      createdAt: now.toISOString(), // Salva data/hora exata
      fullTimestamp: formatFullTimestamp(now), // Formato completo para exibição
      likes: 0,
      comments: 0,
      likedBy: [],
      commentsList: [],
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
              likedBy: likedBy.filter(email => email !== userEmail),
            };
          } else {
            return {
              ...post,
              likes: post.likes + 1,
              likedBy: [...likedBy, userEmail],
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

  // Função para adicionar um comentário
  const addComment = (postId, content, author) => {
    const now = new Date();
    const newComment = {
      id: Date.now(),
      author: author,
      content: content,
      timestamp: formatTimestamp(now),
      createdAt: now.toISOString(), // Salva data/hora exata
      fullTimestamp: formatFullTimestamp(now), // Formato completo para exibição
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedCommentsList = [
            ...(post.commentsList || []),
            newComment,
          ];
          return {
            ...post,
            comments: updatedCommentsList.length,
            commentsList: updatedCommentsList,
          };
        }
        return post;
      })
    );

    return newComment;
  };

  // Função para deletar um comentário (apenas o autor pode deletar)
  const deleteComment = (postId, commentId, userEmail) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const currentUser = users.find(u => u.email === userEmail);

          if (currentUser) {
            const updatedCommentsList = (post.commentsList || []).filter(
              comment => {
                return !(
                  comment.id === commentId &&
                  comment.author === currentUser.name
                );
              }
            );

            return {
              ...post,
              comments: updatedCommentsList.length,
              commentsList: updatedCommentsList,
            };
          }
        }
        return post;
      })
    );
  };

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    deletePost,
    addComment,
    deleteComment,
  };
};

export default usePosts;
