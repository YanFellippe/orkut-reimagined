import { useState, useEffect, useCallback } from 'react';

const usePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fotos iniciais de demonstração
  const getInitialPhotos = useCallback(() => {
    return [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
        album: 'perfil',
        caption: 'Nova foto de perfil! 📸',
        likes: 12,
        comments: 3,
        date: '2024-01-15',
        author: 'Yan Fellippe Gomes Basilio'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop',
        album: 'viagem',
        caption: 'Viagem incrível para a praia! 🏖️',
        likes: 25,
        comments: 8,
        date: '2024-01-10',
        author: 'Yan Fellippe Gomes Basilio'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
        album: 'amigos',
        caption: 'Encontro com a galera do trabalho 👥',
        likes: 18,
        comments: 5,
        date: '2024-01-05',
        author: 'Yan Fellippe Gomes Basilio'
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop',
        album: 'familia',
        caption: 'Almoço em família ❤️',
        likes: 30,
        comments: 12,
        date: '2023-12-25',
        author: 'Yan Fellippe Gomes Basilio'
      }
    ];
  }, []);

  // Carregar fotos do localStorage
  useEffect(() => {
    const savedPhotos = localStorage.getItem('orkutPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    } else {
      const initialPhotos = getInitialPhotos();
      setPhotos(initialPhotos);
      localStorage.setItem('orkutPhotos', JSON.stringify(initialPhotos));
    }
    setLoading(false);
  }, [getInitialPhotos]);

  // Salvar fotos no localStorage sempre que houver mudanças
  useEffect(() => {
    if (!loading && photos.length > 0) {
      localStorage.setItem('orkutPhotos', JSON.stringify(photos));
    }
  }, [photos, loading]);

  // Função para adicionar fotos
  const addPhotos = (photoData) => {
    const { photos: newPhotos, caption, album, author } = photoData;
    const now = new Date();
    
    const photosToAdd = newPhotos.map((photo, index) => ({
      id: Date.now() + index,
      url: photo.url,
      album: album,
      caption: caption || `Nova foto no álbum ${album}`,
      likes: 0,
      comments: 0,
      date: now.toISOString().split('T')[0],
      author: author,
      createdAt: now.toISOString()
    }));

    setPhotos(prevPhotos => [...photosToAdd, ...prevPhotos]);
    return photosToAdd;
  };

  // Função para sincronizar fotos dos posts
  const syncPhotosFromPosts = () => {
    const posts = JSON.parse(localStorage.getItem('orkutPosts') || '[]');
    const existingPhotos = JSON.parse(localStorage.getItem('orkutPhotos') || '[]');
    
    const photosFromPosts = [];
    
    posts.forEach(post => {
      if (post.photos && post.photos.images) {
        post.photos.images.forEach((photo, index) => {
          // Verificar se a foto já existe
          const photoExists = existingPhotos.some(existingPhoto => 
            existingPhoto.url === photo.url && existingPhoto.postId === post.id
          );
          
          if (!photoExists) {
            photosFromPosts.push({
              id: `${post.id}_${index}`,
              postId: post.id,
              url: photo.url,
              album: post.photos.album || 'outros',
              caption: post.content,
              likes: post.likes || 0,
              comments: post.comments || 0,
              date: post.createdAt ? post.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
              author: post.author,
              createdAt: post.createdAt || new Date().toISOString()
            });
          }
        });
      }
    });

    if (photosFromPosts.length > 0) {
      const updatedPhotos = [...photosFromPosts, ...existingPhotos];
      setPhotos(updatedPhotos);
      localStorage.setItem('orkutPhotos', JSON.stringify(updatedPhotos));
    }
  };

  // Função para curtir uma foto
  const togglePhotoLike = (photoId, userEmail) => {
    setPhotos(prevPhotos =>
      prevPhotos.map(photo => {
        if (photo.id === photoId) {
          const likedBy = photo.likedBy || [];
          const userAlreadyLiked = likedBy.includes(userEmail);

          if (userAlreadyLiked) {
            return {
              ...photo,
              likes: Math.max(0, photo.likes - 1),
              likedBy: likedBy.filter(email => email !== userEmail),
            };
          } else {
            return {
              ...photo,
              likes: photo.likes + 1,
              likedBy: [...likedBy, userEmail],
            };
          }
        }
        return photo;
      })
    );
  };

  return {
    photos,
    loading,
    addPhotos,
    syncPhotosFromPosts,
    togglePhotoLike
  };
};

export default usePhotos;