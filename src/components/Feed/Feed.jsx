import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Send, Trash2 } from 'lucide-react';
import usePosts from '../../hooks/usePosts';

const Feed = ({ user }) => {
  const { posts, loading, createPost, toggleLike, deletePost } = usePosts();
  const [newPost, setNewPost] = useState('');

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
        <form onSubmit={handleSubmitPost}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="O que você está pensando?"
            className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orkut-pink focus:border-orkut-pink transition-all duration-200"
            rows="3"
          />
          <div className="flex justify-end mt-3">
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
                <div className="w-10 h-10 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {post.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{post.author}</h4>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
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
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-orkut-pink transition-colors duration-200">
                <MessageCircle size={18} />
                <span className="text-sm">{post.comments}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-orkut-pink transition-colors duration-200">
                <Share2 size={18} />
                <span className="text-sm">Compartilhar</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feed;