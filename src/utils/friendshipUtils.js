import { demoFriends, friendSuggestions } from './demoData';

// Função para calcular o número total de amigos
export const getTotalFriendsCount = () => {
  const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
  const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
  
  // Contar amigos dos dados demo que não foram removidos
  const demoFriendsCount = demoFriends.filter(friend => {
    const userIdentifier = friend.email || `user_${friend.id}` || friend.name;
    const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
    const friendship = friendships[friendshipKey];
    
    // Incluir se não foi removido
    return !friendship || friendship.status !== 'removed';
  }).length;
  
  // Contar amigos adicionados das sugestões
  const addedFromSuggestionsCount = friendSuggestions.filter(suggestion => {
    const userIdentifier = suggestion.email || `user_${suggestion.id}` || suggestion.name;
    const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
    const friendship = friendships[friendshipKey];
    
    // Incluir se foi adicionado
    return friendship && friendship.status === 'friends' && friendship.source === 'suggestion';
  }).length;
  
  return demoFriendsCount + addedFromSuggestionsCount;
};

// Função para obter a lista atual de amigos
export const getCurrentFriendsList = () => {
  const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
  const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
  
  // Amigos dos dados demo que não foram removidos
  const demoFriendsActive = demoFriends.filter(friend => {
    const userIdentifier = friend.email || `user_${friend.id}` || friend.name;
    const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
    const friendship = friendships[friendshipKey];
    
    // Incluir se não foi removido
    return !friendship || friendship.status !== 'removed';
  });
  
  // Amigos adicionados das sugestões
  const addedFromSuggestions = friendSuggestions.filter(suggestion => {
    const userIdentifier = suggestion.email || `user_${suggestion.id}` || suggestion.name;
    const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
    const friendship = friendships[friendshipKey];
    
    // Incluir se foi adicionado
    return friendship && friendship.status === 'friends' && friendship.source === 'suggestion';
  });
  
  return [...demoFriendsActive, ...addedFromSuggestions];
};

// Função para obter sugestões de amigos
export const getFriendSuggestions = () => {
  const friendships = JSON.parse(localStorage.getItem('friendships') || '{}');
  const currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
  
  // Filtrar sugestões que ainda não são amigas
  const suggestions = friendSuggestions.filter(suggestion => {
    const userIdentifier = suggestion.email || `user_${suggestion.id}` || suggestion.name;
    const friendshipKey = `${currentUserEmail}_${userIdentifier}`;
    const friendship = friendships[friendshipKey];
    
    // Não sugerir se já é amigo
    if (friendship && friendship.status === 'friends') {
      return false;
    }
    
    // Incluir se não tem registro de amizade ou se foi removido (para dar chance de re-adicionar)
    return !friendship || friendship.status === 'removed';
  });
  
  // Ordenar por número de amigos em comum (descendente)
  return suggestions.sort((a, b) => b.mutualFriends - a.mutualFriends);
};

// Função para disparar evento de mudança de amizade
export const notifyFriendshipChange = () => {
  window.dispatchEvent(new Event('friendshipChanged'));
};