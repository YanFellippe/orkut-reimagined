import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, Crown, Lock, Globe, UserPlus, MessageCircle, 
  Eye, Calendar, TrendingUp, Image, Video, FileText, Settings 
} from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import useAuth from '../../hooks/useAuth';

const CommunityProfile = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  // Função para obter dados da comunidade baseado no ID
  const getCommunityData = (id) => {
    // Mapeamento completo de todas as 20 comunidades
    const communities = {
      '1': { id, name: 'Os Ninjas da Konoha', avatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=300&fit=crop', description: 'Comunidade dedicada aos ninjas de Naruto', category: 'Anime & Mangá', members: 15420, admin: { name: 'SakuraUchiha', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }, moderators: [{ name: 'NarutoUzumaki', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }], mutualFriends: 23, isPrivate: false, isMember: false, createdDate: '2008-05-20', stats: { posts: 1247, photos: 856, videos: 123, events: 45 }, recentActivity: [{ type: 'post', author: 'NarutoFan123', content: 'Alguém mais acha que o Naruto evoluiu muito no Shippuden?', timestamp: '2 horas atrás', replies: 15 }] },
      
      '2': { id, name: 'Só faço merda', avatar: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=300&fit=crop', description: 'Para quem sempre se mete em confusão', category: 'Humor', members: 8934, admin: { name: 'ChaosKing', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }, moderators: [{ name: 'ConfusaoTotal', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 45, isPrivate: false, isMember: false, createdDate: '2007-08-12', stats: { posts: 3456, photos: 1234, videos: 234, events: 12 }, recentActivity: [{ type: 'post', author: 'DesastreVivo', content: 'Hoje quebrei o vaso da minha mãe tentando matar uma barata 😅', timestamp: '1 hora atrás', replies: 67 }] },
      
      '3': { id, name: 'Anime-Sou Viciado', avatar: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=800&h=300&fit=crop', description: 'Viciados em anime se reúnem aqui!', category: 'Anime & Mangá', members: 25678, admin: { name: 'OtakuMaster', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }, moderators: [{ name: 'AnimeLover', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 67, isPrivate: false, isMember: false, createdDate: '2008-01-10', stats: { posts: 5678, photos: 2345, videos: 456, events: 78 }, recentActivity: [{ type: 'post', author: 'OtakuMaster', content: 'Alguém assistiu o último episódio de Attack on Titan?', timestamp: '30 min atrás', replies: 234 }] },
      
      '4': { id, name: 'Eu odeio acordar cedo', avatar: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=300&fit=crop', description: 'Para os que sofrem todas as manhãs', category: 'Humor', members: 42156, admin: { name: 'SleepyHead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }, moderators: [{ name: 'SonecaEterna', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 89, isPrivate: false, isMember: false, createdDate: '2007-09-22', stats: { posts: 4567, photos: 1890, videos: 234, events: 34 }, recentActivity: [{ type: 'post', author: 'SleepyHead', content: 'Quem mais teve que acordar 5:30 hoje? 😴', timestamp: '2 horas atrás', replies: 178 }] },
      
      '5': { id, name: 'Gamers do Brasil', avatar: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=300&fit=crop', description: 'A maior comunidade gamer do país', category: 'Games', members: 78234, admin: { name: 'ProGamer2008', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }, moderators: [{ name: 'GameMaster', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }], mutualFriends: 156, isPrivate: false, isMember: false, createdDate: '2008-02-14', stats: { posts: 8901, photos: 3456, videos: 789, events: 123 }, recentActivity: [{ type: 'post', author: 'ProGamer2008', content: 'Alguém jogando o novo God of War?', timestamp: '1 hora atrás', replies: 234 }] },
      
      '6': { id, name: 'Eu amo minha mãe', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=300&fit=crop', description: 'Homenagem às nossas mães queridas', category: 'Família', members: 156789, admin: { name: 'FilhoCarinhoso', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }, moderators: [{ name: 'AmorMaterno', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 234, isPrivate: false, isMember: false, createdDate: '2007-05-12', stats: { posts: 6789, photos: 4567, videos: 345, events: 89 }, recentActivity: [{ type: 'post', author: 'FilhoCarinhoso', content: 'Minha mãe fez o melhor bolo do mundo hoje! ❤️', timestamp: '2 horas atrás', replies: 345 }] },
      
      '7': { id, name: 'Metaleiros do Orkut', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop', description: 'Rock e Metal de qualidade', category: 'Música', members: 34567, admin: { name: 'MetalHead666', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }, moderators: [{ name: 'RockStar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }], mutualFriends: 78, isPrivate: false, isMember: false, createdDate: '2007-11-15', stats: { posts: 2345, photos: 1567, videos: 234, events: 56 }, recentActivity: [{ type: 'post', author: 'MetalHead666', content: 'Alguém foi no show do Iron Maiden?', timestamp: '3 horas atrás', replies: 89 }] },
      
      '8': { id, name: 'Eu tenho mais de 13 anos', avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=300&fit=crop', description: 'Para os mais maduros do Orkut', category: 'Geral', members: 89456, admin: { name: 'AdultoResponsavel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }, moderators: [{ name: 'Maduro', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 123, isPrivate: false, isMember: false, createdDate: '2007-06-20', stats: { posts: 3456, photos: 2134, videos: 345, events: 67 }, recentActivity: [{ type: 'post', author: 'AdultoResponsavel', content: 'Discussões maduras sobre a vida', timestamp: '4 horas atrás', replies: 156 }] },
      
      '9': { id, name: 'Fotolog Memories', avatar: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=300&fit=crop', description: 'Saudades do Fotolog', category: 'Nostalgia', members: 23456, admin: { name: 'FotoNostalgico', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }, moderators: [{ name: 'MemoriaViva', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 56, isPrivate: false, isMember: false, createdDate: '2008-03-10', stats: { posts: 1234, photos: 5678, videos: 123, events: 23 }, recentActivity: [{ type: 'post', author: 'FotoNostalgico', content: 'Quem lembra das fotos com efeitos do Fotolog?', timestamp: '5 horas atrás', replies: 234 }] },
      
      '10': { id, name: 'Eu amo pizza', avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=300&fit=crop', description: 'Para os amantes da pizza', category: 'Culinária', members: 67890, admin: { name: 'PizzaLover', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }, moderators: [{ name: 'ChefPizza', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 145, isPrivate: false, isMember: false, createdDate: '2007-12-05', stats: { posts: 4567, photos: 3456, videos: 234, events: 78 }, recentActivity: [{ type: 'post', author: 'PizzaLover', content: 'Qual o melhor sabor de pizza?', timestamp: '1 hora atrás', replies: 345 }] },
      
      '11': { id, name: 'Academia Forever', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=300&fit=crop', description: 'Estudantes unidos pelo conhecimento', category: 'Educação', members: 45123, admin: { name: 'StudyMaster', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }, moderators: [{ name: 'Professor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }], mutualFriends: 89, isPrivate: false, isMember: false, createdDate: '2008-02-28', stats: { posts: 5678, photos: 2345, videos: 456, events: 123 }, recentActivity: [{ type: 'post', author: 'StudyMaster', content: 'Dicas de estudo para o vestibular', timestamp: '2 horas atrás', replies: 234 }] },
      
      '12': { id, name: 'Eu odeio segunda-feira', avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop', description: 'O dia mais odiado da semana', category: 'Humor', members: 98765, admin: { name: 'MondayHater', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }, moderators: [{ name: 'WeekendLover', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }], mutualFriends: 178, isPrivate: false, isMember: false, createdDate: '2007-07-16', stats: { posts: 6789, photos: 2345, videos: 345, events: 45 }, recentActivity: [{ type: 'post', author: 'MondayHater', content: 'Mais uma segunda-feira terrível 😭', timestamp: '6 horas atrás', replies: 456 }] },
      
      '13': { id, name: 'Pokémon Masters', avatar: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=800&h=300&fit=crop', description: 'Gotta catch em all!', category: 'Anime & Mangá', members: 56789, admin: { name: 'PokeMaster', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }, moderators: [{ name: 'Pikachu', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 112, isPrivate: false, isMember: false, createdDate: '2008-04-01', stats: { posts: 3456, photos: 4567, videos: 234, events: 89 }, recentActivity: [{ type: 'post', author: 'PokeMaster', content: 'Qual seu Pokémon favorito?', timestamp: '3 horas atrás', replies: 234 }] },
      
      '14': { id, name: 'Eu sou de Brasília', avatar: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=300&fit=crop', description: 'Brasilienses unidos', category: 'Regional', members: 234567, admin: { name: 'Brasiliense', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }, moderators: [{ name: 'CapitalFederal', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }], mutualFriends: 267, isPrivate: false, isMember: false, createdDate: '2007-04-21', stats: { posts: 7890, photos: 3456, videos: 456, events: 123 }, recentActivity: [{ type: 'post', author: 'Brasiliense', content: 'Eventos em Brasília neste fim de semana', timestamp: '4 horas atrás', replies: 178 }] },
      
      '15': { id, name: 'Eu amo chocolate', avatar: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=300&fit=crop', description: 'Viciados em chocolate', category: 'Culinária', members: 87654, admin: { name: 'ChocolateAddict', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }, moderators: [{ name: 'CocoaLover', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }], mutualFriends: 198, isPrivate: false, isMember: false, createdDate: '2008-01-14', stats: { posts: 4567, photos: 5678, videos: 234, events: 67 }, recentActivity: [{ type: 'post', author: 'ChocolateAddict', content: 'Receita de brownie perfeito!', timestamp: '2 horas atrás', replies: 289 }] },
      
      '16': { id, name: 'Eu sou do Rio', avatar: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=300&fit=crop', description: 'Cariocas da gema', category: 'Regional', members: 189456, admin: { name: 'Carioca', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }, moderators: [{ name: 'CidadeMaravilhosa', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 223, isPrivate: false, isMember: false, createdDate: '2007-08-15', stats: { posts: 6789, photos: 4567, videos: 345, events: 156 }, recentActivity: [{ type: 'post', author: 'Carioca', content: 'Praia de Copacabana hoje está linda!', timestamp: '1 hora atrás', replies: 234 }] },
      
      '17': { id, name: 'Eu odeio matemática', avatar: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=300&fit=crop', description: 'Unidos contra os números', category: 'Educação', members: 76543, admin: { name: 'MathHater', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }, moderators: [{ name: 'NumerosFora', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }], mutualFriends: 134, isPrivate: false, isMember: false, createdDate: '2008-03-22', stats: { posts: 3456, photos: 1234, videos: 123, events: 34 }, recentActivity: [{ type: 'post', author: 'MathHater', content: 'Quem mais odeia equações?', timestamp: '5 horas atrás', replies: 345 }] },
      
      '18': { id, name: 'Eu amo meu namorado', avatar: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=300&fit=crop', description: 'Apaixonadas declarando amor', category: 'Relacionamento', members: 123456, admin: { name: 'ApaixonadaFeliz', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }, moderators: [{ name: 'AmorVerdadeiro', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }], mutualFriends: 189, isPrivate: false, isMember: false, createdDate: '2007-02-14', stats: { posts: 5678, photos: 6789, videos: 234, events: 78 }, recentActivity: [{ type: 'post', author: 'ApaixonadaFeliz', content: 'Meu namorado é o melhor do mundo! ❤️', timestamp: '3 horas atrás', replies: 456 }] },
      
      '19': { id, name: 'Eu odeio recreio curto', avatar: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=300&fit=crop', description: 'Para quem sofre com intervalos pequenos na escola! Aqui reunimos estudantes que sabem que 15 minutos de recreio é muito pouco para relaxar, socializar e ainda conseguir ir ao banheiro. Vamos lutar por recreios mais longos! ⏰📚', category: 'Educação', members: 98234, admin: { name: 'EstudanteRebelde', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }, moderators: [{ name: 'RecreioLivre', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }, { name: 'TempoEscasso', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop' }], mutualFriends: 156, isPrivate: false, isMember: false, createdDate: '2007-03-15', stats: { posts: 2847, photos: 1234, videos: 89, events: 23 }, recentActivity: [{ type: 'post', author: 'EstudanteStressado', content: 'Gente, hoje o recreio foi de 10 minutos só! Nem deu tempo de comer o lanche direito 😭', timestamp: '1 hora atrás', replies: 42 }, { type: 'post', author: 'RecreioLivre', content: 'Proposta: vamos fazer um abaixo-assinado para recreios de pelo menos 30 minutos!', timestamp: '3 horas atrás', replies: 78 }] },
      
      '20': { id, name: 'Eu amo dormir', avatar: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=300&fit=crop', description: 'Para os amantes do sono', category: 'Estilo de Vida', members: 145678, admin: { name: 'SleepLover', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' }, moderators: [{ name: 'DreamMaster', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop' }], mutualFriends: 201, isPrivate: false, isMember: false, createdDate: '2007-10-30', stats: { posts: 4567, photos: 2345, videos: 123, events: 45 }, recentActivity: [{ type: 'post', author: 'SleepLover', content: 'Dormi 12 horas hoje e ainda estou com sono 😴', timestamp: '4 horas atrás', replies: 234 }] }
    };

    return communities[id] || {
      id, name: 'Comunidade não encontrada', avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop', 
      coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=300&fit=crop', 
      description: 'Esta comunidade não foi encontrada.', category: 'Geral', members: 0, 
      admin: { name: 'Sistema', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' }, 
      moderators: [], mutualFriends: 0, isPrivate: false, isMember: false, createdDate: '2008-01-01', 
      stats: { posts: 0, photos: 0, videos: 0, events: 0 }, recentActivity: []
    };
  };

  const community = getCommunityData(communityId);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const tabs = [
    { id: 'posts', label: 'Tópicos', icon: MessageCircle },
    { id: 'photos', label: 'Fotos', icon: Image },
    { id: 'videos', label: 'Vídeos', icon: Video },
    { id: 'events', label: 'Eventos', icon: Calendar }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      
      <main className="flex-1 bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-orkut-pink hover:text-pink-600 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          {/* Community Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="orkut-card overflow-hidden mb-6"
          >
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-orkut-pink to-purple-500 relative overflow-hidden">
              <img
                src={community.coverImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Privacy Badge */}
              <div className="absolute top-4 right-4">
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-white text-sm ${
                  community.isPrivate ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  {community.isPrivate ? <Lock size={14} /> : <Globe size={14} />}
                  <span>{community.isPrivate ? 'Privada' : 'Pública'}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6 -mt-20 relative">
                {/* Community Avatar */}
                <div className="relative mb-4 md:mb-0">
                  <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-white bg-white">
                    <img
                      src={community.avatar}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Community Info */}
                <div className="flex-1 mt-4 md:mt-16">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">{community.name}</h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {community.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{community.members.toLocaleString()} membros</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>Desde {new Date(community.createdDate).getFullYear()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      {community.isMember ? (
                        <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200">
                          Sair da Comunidade
                        </button>
                      ) : (
                        <button className="orkut-button flex items-center space-x-2">
                          <UserPlus size={16} />
                          <span>Participar</span>
                        </button>
                      )}
                      <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                        <Eye size={16} />
                        <span>Seguir</span>
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{community.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{community.stats.posts}</div>
                      <div className="text-sm text-gray-600">Tópicos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{community.stats.photos}</div>
                      <div className="text-sm text-gray-600">Fotos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{community.stats.videos}</div>
                      <div className="text-sm text-gray-600">Vídeos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-orkut-pink">{community.stats.events}</div>
                      <div className="text-sm text-gray-600">Eventos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Navigation Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="orkut-card p-4 mb-6"
              >
                <div className="flex space-x-1 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-orkut-pink text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Content Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="orkut-card p-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                
                {activeTab === 'posts' && (
                  <div className="space-y-4">
                    {/* Tópico fixado para comunidade específica */}
                    {communityId === '19' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">📌</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-800">EstudanteRebelde</span>
                              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">ADMIN</span>
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">FIXADO</span>
                            </div>
                            <p className="text-gray-700 mb-2">
                              <strong>📢 REGRAS DA COMUNIDADE:</strong><br/>
                              1. Respeite todos os membros<br/>
                              2. Compartilhe suas experiências com recreios curtos<br/>
                              3. Proibido spam ou conteúdo ofensivo<br/>
                              4. Vamos lutar juntos por recreios mais longos! ⏰
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>89 curtidas</span>
                              <span>12 comentários</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {community.recentActivity.map((activity, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {getInitials(activity.author)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-800">{activity.author}</span>
                              <span className="text-sm text-gray-500">{activity.timestamp}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{activity.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              {activity.replies && (
                                <span>{activity.replies} respostas</span>
                              )}
                              {activity.likes && (
                                <span>{activity.likes} curtidas</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Conteúdo adicional para a comunidade específica */}
                    {communityId === '19' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-bold text-blue-800 mb-2">💡 Dicas para aproveitar melhor o recreio:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Organize seu lanche antes do recreio começar</li>
                          <li>• Tenha sempre uma garrafa d'água por perto</li>
                          <li>• Faça amizades para otimizar o tempo de socialização</li>
                          <li>• Sugira atividades rápidas e divertidas</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab !== 'posts' && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Conteúdo em desenvolvimento...</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Admin & Moderators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="orkut-card p-4"
              >
                <h3 className="font-bold text-gray-800 mb-3">Administração</h3>
                
                {/* Admin */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={community.admin.avatar}
                      alt={community.admin.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-gray-800">{community.admin.name}</span>
                      <Crown size={14} className="text-yellow-500" />
                    </div>
                    <div className="text-xs text-gray-500">Administrador</div>
                  </div>
                </div>

                {/* Moderators */}
                <div className="space-y-2">
                  {community.moderators.map((mod, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={mod.avatar}
                          alt={mod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 text-sm">{mod.name}</div>
                        <div className="text-xs text-gray-500">Moderador</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mutual Friends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="orkut-card p-4"
              >
                <h3 className="font-bold text-gray-800 mb-3">
                  Amigos na Comunidade ({community.mutualFriends})
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orkut-pink to-pink-600 rounded-lg mx-auto mb-1 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {String.fromCharCode(65 + i)}{String.fromCharCode(65 + i + 1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 truncate">
                        Amigo {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 text-sm text-orkut-pink hover:underline">
                  Ver todos
                </button>
              </motion.div>

              {/* Seção especial para comunidade do recreio */}
              {communityId === '19' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="orkut-card p-4 mb-6"
                >
                  <h3 className="font-bold text-gray-800 mb-3">⏰ Cronômetro do Recreio</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">15:00</div>
                    <div className="text-sm text-red-700">Tempo médio de recreio</div>
                    <div className="text-xs text-red-600 mt-2">😤 Muito pouco!</div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tempo ideal:</span>
                      <span className="font-semibold text-green-600">30+ min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recorde mais curto:</span>
                      <span className="font-semibold text-red-600">5 min 😱</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Community Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="orkut-card p-4"
              >
                <h3 className="font-bold text-gray-800 mb-3">Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={14} className="text-green-500" />
                      <span className="text-sm text-gray-600">Crescimento mensal</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {communityId === '19' ? '+18%' : '+12%'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle size={14} className="text-blue-500" />
                      <span className="text-sm text-gray-600">Posts esta semana</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {communityId === '19' ? '89' : '47'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users size={14} className="text-purple-500" />
                      <span className="text-sm text-gray-600">Membros ativos</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {communityId === '19' ? '5.2k' : '2.3k'}
                    </span>
                  </div>

                  {communityId === '19' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">⏰</span>
                        <span className="text-sm text-gray-600">Reclamações hoje</span>
                      </div>
                      <span className="text-sm font-semibold text-red-600">127</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityProfile;