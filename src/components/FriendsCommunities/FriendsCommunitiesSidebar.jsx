import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe } from 'lucide-react';
import FriendPreviewModal from '../Modals/FriendPreviewModal';
import CommunityPreviewModal from '../Modals/CommunityPreviewModal';
import AllFriendsModal from '../Modals/AllFriendsModal';
import AllCommunitiesModal from '../Modals/AllCommunitiesModal';

const FriendsCommunitiesSidebar = ({ user }) => {
  const [hoveredFriend, setHoveredFriend] = useState(null);
  const [hoveredCommunity, setHoveredCommunity] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0, arrowPosition: 'left' });
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [showAllCommunities, setShowAllCommunities] = useState(false);

  // Dados de demonstração para amigos (50 amigos)
  const friends = [
    { id: 1, name: 'Priscilaaaa', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop', mutualFriends: 485, isOnline: true, location: 'São Paulo, SP', relationship: 'solteira' },
    { id: 2, name: 'Natália', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', mutualFriends: 338, isOnline: false, location: 'Rio de Janeiro, RJ', relationship: 'namorando' },
    { id: 3, name: 'Ewerton', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', mutualFriends: 103, isOnline: true, location: 'Belo Horizonte, MG', relationship: 'solteiro' },
    { id: 4, name: 'uzumaki sakura', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', mutualFriends: 482, isOnline: false, location: 'Brasília, DF', relationship: 'casada' },
    { id: 5, name: 'Tayane', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', mutualFriends: 365, isOnline: true, location: 'Salvador, BA', relationship: 'solteira' },
    { id: 6, name: 'Murilo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', mutualFriends: 99, isOnline: false, location: 'Fortaleza, CE', relationship: 'namorando' },
    { id: 7, name: 'Amanda Silva', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', mutualFriends: 267, isOnline: true, location: 'Curitiba, PR', relationship: 'solteira' },
    { id: 8, name: 'Rafael Costa', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', mutualFriends: 189, isOnline: false, location: 'Porto Alegre, RS', relationship: 'casado' },
    { id: 9, name: 'Juliana Santos', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop', mutualFriends: 423, isOnline: true, location: 'Recife, PE', relationship: 'namorando' },
    { id: 10, name: 'Bruno Oliveira', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop', mutualFriends: 156, isOnline: false, location: 'Goiânia, GO', relationship: 'solteiro' },
    { id: 11, name: 'Camila Ferreira', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop', mutualFriends: 312, isOnline: true, location: 'Manaus, AM', relationship: 'solteira' },
    { id: 12, name: 'Diego Almeida', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop', mutualFriends: 78, isOnline: false, location: 'Belém, PA', relationship: 'namorando' },
    { id: 13, name: 'Fernanda Lima', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop', mutualFriends: 445, isOnline: true, location: 'Vitória, ES', relationship: 'casada' },
    { id: 14, name: 'Lucas Pereira', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', mutualFriends: 234, isOnline: false, location: 'Florianópolis, SC', relationship: 'solteiro' },
    { id: 15, name: 'Gabriela Rocha', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop', mutualFriends: 389, isOnline: true, location: 'Campo Grande, MS', relationship: 'solteira' },
    { id: 16, name: 'Thiago Martins', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', mutualFriends: 167, isOnline: false, location: 'João Pessoa, PB', relationship: 'namorando' },
    { id: 17, name: 'Larissa Souza', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop', mutualFriends: 298, isOnline: true, location: 'Aracaju, SE', relationship: 'solteira' },
    { id: 18, name: 'André Barbosa', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop', mutualFriends: 145, isOnline: false, location: 'Teresina, PI', relationship: 'casado' },
    { id: 19, name: 'Bianca Cardoso', avatar: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=100&h=100&fit=crop', mutualFriends: 356, isOnline: true, location: 'Maceió, AL', relationship: 'namorando' },
    { id: 20, name: 'Rodrigo Nunes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', mutualFriends: 89, isOnline: false, location: 'São Luís, MA', relationship: 'solteiro' },
    { id: 21, name: 'Vanessa Dias', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop', mutualFriends: 412, isOnline: true, location: 'Natal, RN', relationship: 'solteira' },
    { id: 22, name: 'Felipe Gomes', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', mutualFriends: 223, isOnline: false, location: 'Cuiabá, MT', relationship: 'casado' },
    { id: 23, name: 'Mariana Castro', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', mutualFriends: 334, isOnline: true, location: 'Palmas, TO', relationship: 'namorando' },
    { id: 24, name: 'Gustavo Reis', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop', mutualFriends: 178, isOnline: false, location: 'Boa Vista, RR', relationship: 'solteiro' },
    { id: 25, name: 'Carolina Mendes', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', mutualFriends: 467, isOnline: true, location: 'Rio Branco, AC', relationship: 'solteira' },
    { id: 26, name: 'Mateus Silva', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop', mutualFriends: 134, isOnline: false, location: 'Porto Velho, RO', relationship: 'namorando' },
    { id: 27, name: 'Isabela Torres', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop', mutualFriends: 289, isOnline: true, location: 'Macapá, AP', relationship: 'casada' },
    { id: 28, name: 'Vinicius Lopes', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', mutualFriends: 201, isOnline: false, location: 'São Paulo, SP', relationship: 'solteiro' },
    { id: 29, name: 'Letícia Araújo', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop', mutualFriends: 378, isOnline: true, location: 'Rio de Janeiro, RJ', relationship: 'solteira' },
    { id: 30, name: 'Daniel Moreira', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop', mutualFriends: 156, isOnline: false, location: 'Belo Horizonte, MG', relationship: 'namorando' },
    { id: 31, name: 'Patrícia Cunha', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop', mutualFriends: 423, isOnline: true, location: 'Salvador, BA', relationship: 'casada' },
    { id: 32, name: 'Renato Farias', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', mutualFriends: 98, isOnline: false, location: 'Fortaleza, CE', relationship: 'solteiro' },
    { id: 33, name: 'Aline Ribeiro', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop', mutualFriends: 345, isOnline: true, location: 'Curitiba, PR', relationship: 'solteira' },
    { id: 34, name: 'Marcelo Teixeira', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop', mutualFriends: 212, isOnline: false, location: 'Porto Alegre, RS', relationship: 'namorando' },
    { id: 35, name: 'Roberta Campos', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop', mutualFriends: 389, isOnline: true, location: 'Recife, PE', relationship: 'casada' },
    { id: 36, name: 'João Pedro', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', mutualFriends: 167, isOnline: false, location: 'Goiânia, GO', relationship: 'solteiro' },
    { id: 37, name: 'Bruna Machado', avatar: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=100&h=100&fit=crop', mutualFriends: 298, isOnline: true, location: 'Manaus, AM', relationship: 'solteira' },
    { id: 38, name: 'Caio Henrique', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', mutualFriends: 134, isOnline: false, location: 'Belém, PA', relationship: 'namorando' },
    { id: 39, name: 'Débora Vieira', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop', mutualFriends: 456, isOnline: true, location: 'Vitória, ES', relationship: 'casada' },
    { id: 40, name: 'Eduardo Santos', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', mutualFriends: 189, isOnline: false, location: 'Florianópolis, SC', relationship: 'solteiro' },
    { id: 41, name: 'Flávia Monteiro', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop', mutualFriends: 323, isOnline: true, location: 'Campo Grande, MS', relationship: 'solteira' },
    { id: 42, name: 'Henrique Borges', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop', mutualFriends: 145, isOnline: false, location: 'João Pessoa, PB', relationship: 'namorando' },
    { id: 43, name: 'Ingrid Nogueira', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', mutualFriends: 378, isOnline: true, location: 'Aracaju, SE', relationship: 'casada' },
    { id: 44, name: 'Leandro Pinto', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop', mutualFriends: 223, isOnline: false, location: 'Teresina, PI', relationship: 'solteiro' },
    { id: 45, name: 'Mônica Freitas', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop', mutualFriends: 267, isOnline: true, location: 'Maceió, AL', relationship: 'solteira' },
    { id: 46, name: 'Nicolas Carvalho', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', mutualFriends: 156, isOnline: false, location: 'São Luís, MA', relationship: 'namorando' },
    { id: 47, name: 'Priscila Duarte', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', mutualFriends: 412, isOnline: true, location: 'Natal, RN', relationship: 'casada' },
    { id: 48, name: 'Ricardo Moura', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop', mutualFriends: 189, isOnline: false, location: 'Cuiabá, MT', relationship: 'solteiro' },
    { id: 49, name: 'Sabrina Correia', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop', mutualFriends: 334, isOnline: true, location: 'Palmas, TO', relationship: 'solteira' },
    { id: 50, name: 'Tiago Ramos', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', mutualFriends: 278, isOnline: false, location: 'Boa Vista, RR', relationship: 'namorando' }
  ];

  // Dados de demonstração para comunidades (20 comunidades)
  const communities = [
    { id: 1, name: 'Os Ninjas da Konoha', avatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop', members: 15420, category: 'Anime & Mangá', description: 'Comunidade dedicada aos ninjas de Naruto', admin: 'SakuraUchiha', mutualFriends: 23, isPrivate: false },
    { id: 2, name: 'Só faço merda', avatar: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop', members: 8934, category: 'Humor', description: 'Para quem sempre se mete em confusão', admin: 'ChaosKing', mutualFriends: 45, isPrivate: false },
    { id: 3, name: 'Anime-Sou Viciado', avatar: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400&h=200&fit=crop', members: 25678, category: 'Anime & Mangá', description: 'Viciados em anime se reúnem aqui!', admin: 'OtakuMaster', mutualFriends: 67, isPrivate: false },
    { id: 4, name: 'Eu odeio acordar cedo', avatar: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=200&fit=crop', members: 42156, category: 'Humor', description: 'Para os que sofrem todas as manhãs', admin: 'SleepyHead', mutualFriends: 89, isPrivate: false },
    { id: 5, name: 'Gamers do Brasil', avatar: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop', members: 78234, category: 'Games', description: 'A maior comunidade gamer do país', admin: 'ProGamer2008', mutualFriends: 156, isPrivate: false },
    { id: 6, name: 'Eu amo minha mãe', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=200&fit=crop', members: 156789, category: 'Família', description: 'Homenagem às nossas mães queridas', admin: 'FilhoCarinhoso', mutualFriends: 234, isPrivate: false },
    { id: 7, name: 'Metaleiros do Orkut', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop', members: 34567, category: 'Música', description: 'Rock e Metal de qualidade', admin: 'MetalHead666', mutualFriends: 78, isPrivate: false },
    { id: 8, name: 'Eu tenho mais de 13 anos', avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop', members: 89456, category: 'Geral', description: 'Para os mais maduros do Orkut', admin: 'AdultoResponsavel', mutualFriends: 123, isPrivate: false },
    { id: 9, name: 'Fotolog Memories', avatar: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=200&fit=crop', members: 23456, category: 'Nostalgia', description: 'Saudades do Fotolog', admin: 'FotoNostalgico', mutualFriends: 56, isPrivate: false },
    { id: 10, name: 'Eu amo pizza', avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop', members: 67890, category: 'Culinária', description: 'Para os amantes da pizza', admin: 'PizzaLover', mutualFriends: 145, isPrivate: false },
    { id: 11, name: 'Academia Forever', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop', members: 45123, category: 'Educação', description: 'Estudantes unidos pelo conhecimento', admin: 'StudyMaster', mutualFriends: 89, isPrivate: false },
    { id: 12, name: 'Eu odeio segunda-feira', avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop', members: 98765, category: 'Humor', description: 'O dia mais odiado da semana', admin: 'MondayHater', mutualFriends: 178, isPrivate: false },
    { id: 13, name: 'Pokémon Masters', avatar: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400&h=200&fit=crop', members: 56789, category: 'Anime & Mangá', description: 'Gotta catch em all!', admin: 'PokeMaster', mutualFriends: 112, isPrivate: false },
    { id: 14, name: 'Eu sou de Brasília', avatar: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop', members: 234567, category: 'Regional', description: 'Brasilienses unidos', admin: 'Brasiliense', mutualFriends: 267, isPrivate: false },
    { id: 15, name: 'Eu amo chocolate', avatar: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=200&fit=crop', members: 87654, category: 'Culinária', description: 'Viciados em chocolate', admin: 'ChocolateAddict', mutualFriends: 198, isPrivate: false },
    { id: 16, name: 'Eu sou do Rio', avatar: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=200&fit=crop', members: 189456, category: 'Regional', description: 'Cariocas da gema', admin: 'Carioca', mutualFriends: 223, isPrivate: false },
    { id: 17, name: 'Eu odeio matemática', avatar: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop', members: 76543, category: 'Educação', description: 'Unidos contra os números', admin: 'MathHater', mutualFriends: 134, isPrivate: false },
    { id: 18, name: 'Eu amo meu namorado', avatar: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=200&fit=crop', members: 123456, category: 'Relacionamento', description: 'Apaixonadas declarando amor', admin: 'ApaixonadaFeliz', mutualFriends: 189, isPrivate: false },
    { id: 19, name: 'Eu odeio recreio curto', avatar: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=200&fit=crop', members: 98234, category: 'Educação', description: 'Para quem sofre com intervalos pequenos na escola', admin: 'EstudanteRebelde', mutualFriends: 156, isPrivate: false },
    { id: 20, name: 'Eu amo dormir', avatar: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=100&h=100&fit=crop', coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=200&fit=crop', members: 145678, category: 'Estilo de Vida', description: 'Para os amantes do sono', admin: 'SleepLover', mutualFriends: 201, isPrivate: false }
  ];

  const calculateModalPosition = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Dimensões do modal
    const modalWidth = 320; // w-80 = 320px
    const modalHeight = 400; // altura aproximada do modal
    const offset = 16; // espaçamento do cursor
    
    let x, y;
    let arrowPosition = 'left'; // posição da seta indicadora
    
    // Calcular posição horizontal
    const spaceRight = windowWidth - mouseX;
    const spaceLeft = mouseX;
    
    if (spaceRight >= modalWidth + offset) {
      // Há espaço à direita
      x = mouseX + offset;
      arrowPosition = 'left';
    } else if (spaceLeft >= modalWidth + offset) {
      // Há espaço à esquerda
      x = mouseX - modalWidth - offset;
      arrowPosition = 'right';
    } else {
      // Centralizar horizontalmente se não há espaço suficiente
      x = Math.max(20, (windowWidth - modalWidth) / 2);
      arrowPosition = 'none';
    }
    
    // Calcular posição vertical
    const spaceBelow = windowHeight - mouseY;
    const spaceAbove = mouseY;
    
    if (spaceBelow >= modalHeight + offset) {
      // Há espaço embaixo
      y = mouseY + offset;
    } else if (spaceAbove >= modalHeight + offset) {
      // Há espaço em cima
      y = mouseY - modalHeight - offset;
    } else {
      // Centralizar verticalmente se não há espaço suficiente
      y = Math.max(20, (windowHeight - modalHeight) / 2);
    }
    
    // Ajustes finais para garantir que não saia da tela
    x = Math.max(20, Math.min(x, windowWidth - modalWidth - 20));
    y = Math.max(20, Math.min(y, windowHeight - modalHeight - 20));
    
    return { x, y, arrowPosition };
  };

  const handleMouseEnter = (type, item, event) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    const position = calculateModalPosition(event);
    setModalPosition(position);
    
    const timeout = setTimeout(() => {
      if (type === 'friend') {
        setHoveredFriend(item);
      } else {
        setHoveredCommunity(item);
      }
    }, 300); // 300ms delay para resposta mais rápida
    
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredFriend(null);
    setHoveredCommunity(null);
  };

  // Função para atualizar posição do modal durante o hover (opcional)
  const handleMouseMove = (event) => {
    if (hoveredFriend || hoveredCommunity) {
      const position = calculateModalPosition(event);
      setModalPosition(position);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Friends Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="orkut-card p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center space-x-2">
            <Users size={18} className="text-orkut-pink" />
            <span>amigos ({friends.length})</span>
          </h3>
          <button 
            onClick={() => setShowAllFriends(true)}
            className="text-xs text-orkut-pink hover:underline"
          >
            ver todos
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {friends.slice(0, 15).map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center cursor-pointer group"
              onMouseEnter={(e) => handleMouseEnter('friend', friend, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => window.location.href = `/friend/${friend.id}`}
            >
              <div className="relative mb-2">
                <div className="w-12 h-12 mx-auto rounded-lg overflow-hidden bg-gray-200 group-hover:ring-2 group-hover:ring-orkut-pink transition-all duration-200">
                  {friend.avatar ? (
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orkut-pink to-pink-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {getInitials(friend.name)}
                      </span>
                    </div>
                  )}
                </div>
                {friend.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="text-xs">
                <div className="font-medium text-gray-800 truncate group-hover:text-orkut-pink transition-colors duration-200">
                  {friend.name}
                </div>
                <div className="text-gray-500">
                  ({friend.mutualFriends})
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Communities Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="orkut-card p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center space-x-2">
            <Globe size={18} className="text-orkut-pink" />
            <span>comunidades ({communities.length})</span>
          </h3>
          <button 
            onClick={() => setShowAllCommunities(true)}
            className="text-xs text-orkut-pink hover:underline"
          >
            ver todas
          </button>
        </div>

        <div className="space-y-1.5 max-h-64 overflow-y-auto">
          {communities.slice(0, 12).map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors duration-200"
              onMouseEnter={(e) => handleMouseEnter('community', community, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => window.location.href = `/community/${community.id}`}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 group-hover:ring-2 group-hover:ring-orkut-pink transition-all duration-200">
                <img
                  src={community.avatar}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate group-hover:text-orkut-pink transition-colors duration-200">
                  {community.name}
                </div>
                <div className="text-xs text-gray-500">
                  {community.members.toLocaleString()} membros
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Preview Modals */}
      {hoveredFriend && (
        <FriendPreviewModal
          friend={hoveredFriend}
          position={modalPosition}
          onClose={() => setHoveredFriend(null)}
        />
      )}

      {hoveredCommunity && (
        <CommunityPreviewModal
          community={hoveredCommunity}
          position={modalPosition}
          onClose={() => setHoveredCommunity(null)}
        />
      )}

      {/* All Friends Modal */}
      {showAllFriends && (
        <AllFriendsModal
          friends={friends}
          onClose={() => setShowAllFriends(false)}
        />
      )}

      {/* All Communities Modal */}
      {showAllCommunities && (
        <AllCommunitiesModal
          communities={communities}
          onClose={() => setShowAllCommunities(false)}
        />
      )}
    </div>
  );
};

export default FriendsCommunitiesSidebar;