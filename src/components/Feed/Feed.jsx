import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Send, Trash2, Camera } from 'lucide-react';
import usePosts from '../../hooks/usePosts';
import usePhotos from '../../hooks/usePhotos';
import AddPhotoModal from '../Modals/AddPhotoModal';

const Feed = ({ user }) => {
  const { posts, loading, createPost, createPhotoPost, toggleLike, deletePost, addComment, deleteComment } = usePosts();
  const { addPhotos } = usePhotos();
  const [newPost, setNewPost] = useState('');
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [showFullTimestamp, setShowFullTimestamp] = useState({});
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      createPost(newPost, user.name);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    toggleLike(postId, user.email);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      deletePost(postId, user.email);
    }
  };

  const isPostAuthor = (post) => {
    return post.author === user.name;
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleSubmitComment = (e, postId) => {
    e.preventDefault();
    const commentText = newComment[postId];
    if (commentText && commentText.trim()) {
      addComment(postId, commentText.trim(), user.name);
      setNewComment(prev => ({
        ...prev,
        [postId]: ''
      }));
    }
  };

  const handleDeleteComment = (postId, commentId) => {
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      deleteComment(postId, commentId, user.email);
    }
  };

  const isCommentAuthor = (comment) => {
    return comment.author === user.name;
  };

  const toggleTimestampDisplay = (id, type = 'post') => {
    const key = `${type}_${id}`;
    setShowFullTimestamp(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddPhoto = (photoData) => {
    // Criar o post com fotos
    createPhotoPost(photoData);
    
    // Adicionar as fotos ao álbum de fotos
    addPhotos(photoData);
    
    setShowAddPhotoModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-orkut-pink border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Post Creation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="orkut-card p-6"
      >
        <div className="flex items-start space-x-3 mb-4">
          {/* Avatar do usuário na criação de post */}
          {user.profile?.avatar ? (
            <img
              src={user.profile.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">O que você está pensando, {user.name.split(' ')[0]}?</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmitPost}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Compartilhe algo interessante..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orkut-pink focus:border-orkut-pink transition-all duration-200"
            rows="3"
          />
          <div className="flex justify-between items-center mt-3">
            <button
              type="button"
              onClick={() => setShowAddPhotoModal(true)}
              className="flex items-center space-x-2 px-4 py-2 text-orkut-pink border border-orkut-pink rounded-lg hover:bg-orkut-pink hover:text-white transition-colors duration-200"
            >
              <Camera size={16} />
              <span>Adicionar Fotos</span>
            </button>
            
            <button
              type="submit"
              disabled={!newPost.trim()}
              className="orkut-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              <span>Publicar</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="orkut-card p-6"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {/* Avatar do autor do post */}
                {isPostAuthor(post) && user.profile?.avatar ? (
                  <img
                    src={user.profile.avatar}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {post.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-800">{post.author}</h4>
                  <p 
                    className="text-sm text-gray-500 cursor-pointer hover:text-orkut-pink transition-colors duration-200 select-none" 
                    onClick={() => toggleTimestampDisplay(post.id, 'post')}
                    title={showFullTimestamp[`post_${post.id}`] 
                      ? "Clique para ver formato resumido" 
                      : "Clique para ver data/hora completa"
                    }
                  >
                    {showFullTimestamp[`post_${post.id}`] 
                      ? (post.fullTimestamp || post.timestamp)
                      : post.timestamp
                    } 
                    <span className="ml-1 text-xs opacity-50">🕒</span>
                  </p>
                </div>
              </div>
              
              {/* Delete button - only show for post author */}
              {isPostAuthor(post) && (
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-red-50"
                  title="Excluir post"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {/* Post Content */}
            <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

            {/* Photos Grid */}
            {post.photos && post.photos.images && post.photos.images.length > 0 && (
              <div className="mb-4">
                <div className={`grid gap-2 ${
                  post.photos.images.length === 1 
                    ? 'grid-cols-1' 
                    : post.photos.images.length === 2 
                    ? 'grid-cols-2' 
                    : post.photos.images.length === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-2'
                }`}>
                  {post.photos.images.slice(0, 4).map((photo, index) => (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden rounded-lg ${
                        post.photos.images.length === 1 
                          ? 'aspect-video' 
                          : 'aspect-square'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                      />
                      {/* Overlay para mais fotos */}
                      {index === 3 && post.photos.images.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            +{post.photos.images.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {post.photos.album && (
                  <p className="text-sm text-gray-500 mt-2">
                    📁 Álbum: {post.photos.album.charAt(0).toUpperCase() + post.photos.album.slice(1)}
                  </p>
                )}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-colors duration-200 ${
                  post.likedBy?.includes(user.email)
                    ? 'text-orkut-pink'
                    : 'text-gray-600 hover:text-orkut-pink'
                }`}
              >
                <Heart 
                  size={18} 
                  fill={post.likedBy?.includes(user.email) ? 'currentColor' : 'none'}
                />
                <span className="text-sm">{post.likes}</span>
              </button>
              
              <button 
                onClick={() => toggleComments(post.id)}
                className="flex items-center space-x-2 text-gray-600 hover:text-orkut-pink transition-colors duration-200 group"
              >
                <div className="relative">
                  {user.profile?.avatar ? (
                    <img
                      src={user.profile.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border-2 border-gray-300 group-hover:border-orkut-pink transition-colors duration-200"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center border-2 border-gray-300 group-hover:border-orkut-pink transition-colors duration-200">
                      <span className="text-white font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-200">
                    <MessageCircle size={10} className="text-gray-500 group-hover:text-orkut-pink transition-colors duration-200" />
                  </div>
                </div>
                <span className="text-sm">{post.comments}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-orkut-pink transition-colors duration-200">
                <Share2 size={18} />
                <span className="text-sm">Compartilhar</span>
              </button>
            </div>

            {/* Comments Section */}
            {showComments[post.id] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                {/* Comments List */}
                {post.commentsList && post.commentsList.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {post.commentsList.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        {/* Comment Author Avatar */}
                        {isCommentAuthor(comment) && user.profile?.avatar ? (
                          <img
                            src={user.profile.avatar}
                            alt={comment.author}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">
                              {comment.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </span>
                          </div>
                        )}
                        
                        {/* Comment Content */}
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-semibold text-sm text-gray-800">{comment.author}</h5>
                            {isCommentAuthor(comment) && (
                              <button
                                onClick={() => handleDeleteComment(post.id, comment.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                                title="Excluir comentário"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                          <p 
                            className="text-xs text-gray-500 mt-1 cursor-pointer hover:text-orkut-pink transition-colors duration-200" 
                            onClick={() => toggleTimestampDisplay(comment.id, 'comment')}
                            title="Clique para ver data/hora completa"
                          >
                            {showFullTimestamp[`comment_${comment.id}`] 
                              ? (comment.fullTimestamp || comment.timestamp)
                              : comment.timestamp
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Form */}
                <form onSubmit={(e) => handleSubmitComment(e, post.id)} className="flex items-start space-x-3">
                  {/* User Avatar */}
                  {user.profile?.avatar ? (
                    <img
                      src={user.profile.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                  )}
                  
                  {/* Comment Input */}
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment(prev => ({
                        ...prev,
                        [post.id]: e.target.value
                      }))}
                      placeholder="Escreva um comentário..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orkut-pink focus:border-orkut-pink transition-all duration-200"
                    />
                    <button
                      type="submit"
                      disabled={!newComment[post.id]?.trim()}
                      className="px-4 py-2 bg-orkut-pink text-white rounded-full text-sm font-medium hover:bg-pink-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Photo Modal */}
      {showAddPhotoModal && (
        <AddPhotoModal
          user={user}
          onClose={() => setShowAddPhotoModal(false)}
          onAddPhoto={handleAddPhoto}
        />
      )}
    </div>
  );
};

export default Feed;