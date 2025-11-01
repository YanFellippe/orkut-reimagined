import { useEffect } from 'react';
import usePhotos from './usePhotos';

const usePhotoSync = () => {
  const { syncPhotosFromPosts } = usePhotos();

  useEffect(() => {
    // Sincronizar fotos na inicialização
    syncPhotosFromPosts();

    // Configurar listener para mudanças no localStorage dos posts
    const handleStorageChange = (e) => {
      if (e.key === 'orkutPosts') {
        syncPhotosFromPosts();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Verificar periodicamente por mudanças (para mudanças na mesma aba)
    const interval = setInterval(() => {
      syncPhotosFromPosts();
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [syncPhotosFromPosts]);
};

export default usePhotoSync;