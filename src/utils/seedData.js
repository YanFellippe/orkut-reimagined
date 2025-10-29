// Função para popular o localStorage com dados de demonstração
export const seedDemoData = () => {
  // Verificar se já existem usuários
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers) {
    const demoUsers = [
      {
        name: 'Maria Silva',
        email: 'maria@email.com',
        password: '123456',
        profile: {
          bio: 'Apaixonada por música e arte! 🎨✨',
          gender: 'feminino',
          relationship: 'solteira',
          location: 'São Paulo, Brasil',
          age: 28,
          avatar: null,
          interests: ['música', 'arte', 'viagens']
        }
      },
      {
        name: 'João Santos',
        email: 'joao@email.com',
        password: '123456',
        profile: {
          bio: 'Desenvolvedor apaixonado por tecnologia 💻',
          gender: 'masculino',
          relationship: 'namorando',
          location: 'Rio de Janeiro, Brasil',
          age: 32,
          avatar: null,
          interests: ['programação', 'games', 'futebol']
        }
      },
      {
        name: 'Ana Costa',
        email: 'ana@email.com',
        password: '123456',
        profile: {
          bio: 'Professora e mãe orgulhosa! 👩‍🏫❤️',
          gender: 'feminino',
          relationship: 'casada',
          location: 'Belo Horizonte, Brasil',
          age: 35,
          avatar: null,
          interests: ['educação', 'leitura', 'família']
        }
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
    console.log('Dados de demonstração carregados!');
    console.log('Usuários disponíveis:');
    demoUsers.forEach(user => {
      console.log(`- ${user.email} / ${user.password}`);
    });
  }
};

// Função para limpar todos os dados
export const clearAllData = () => {
  localStorage.removeItem('users');
  localStorage.removeItem('activeUser');
  localStorage.removeItem('orkutPosts');
  console.log('Todos os dados foram limpos!');
};

// Função para limpar apenas os posts
export const clearPosts = () => {
  localStorage.removeItem('orkutPosts');
  console.log('Posts limpos!');
};

// Função para ver estatísticas dos dados
export const showStats = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const posts = JSON.parse(localStorage.getItem('orkutPosts') || '[]');
  const activeUser = JSON.parse(localStorage.getItem('activeUser') || 'null');
  
  console.log('📊 Estatísticas do Orkut:');
  console.log(`👥 Usuários cadastrados: ${users.length}`);
  console.log(`📝 Posts criados: ${posts.length}`);
  console.log(`🔐 Usuário ativo: ${activeUser ? activeUser.name : 'Nenhum'}`);
  
  return { users: users.length, posts: posts.length, activeUser };
};