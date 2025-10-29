# 🌸 Orkut Reimagined

O **Orkut Reimagined** é um projeto pessoal criado com o objetivo de **praticar React e desenvolvimento front-end moderno**, recriando a experiência nostálgica da antiga rede social Orkut com uma abordagem atual e responsiva.  

Mais do que um exercício técnico, é também uma homenagem a uma época marcante da internet — agora repaginada com as tecnologias de hoje.

---

## 💡 Motivação

Sempre gostei da ideia de unir **nostalgia e tecnologia**.  
Este projeto nasceu como um desafio pessoal: recriar uma rede social clássica, aplicando conceitos que venho aprendendo sobre **componentização, estados globais, animações e boas práticas de UX/UI**.

Além disso, é um ótimo estudo de **estrutura de projeto em React**, **responsividade com Tailwind CSS** e **armazenamento local** para simular autenticação e persistência de dados.

---

## 🧱 Tecnologias Utilizadas

**Frontend**
- React 18  
- React Router DOM  
- Tailwind CSS  
- Framer Motion (animações)  
- React Hook Form (validação de formulários)  
- Lucide React (ícones)

**Ferramentas**
- Create React App  
- ESLint + Prettier  
- PostCSS + Autoprefixer  

---

## ✨ Principais Funcionalidades

### 🔐 Autenticação
- Login e cadastro de usuários  
- Sessão persistente via localStorage  
- Logout e proteção de rotas  

### 👤 Perfil
- Edição completa de informações pessoais  
- Upload de foto de perfil  
- Biografia e estatísticas de usuário  

### 🏠 Feed
- Criação e exclusão de posts  
- Likes e comentários  
- Timeline cronológica  

### 👥 Amigos e Comunidades
- Lista de amigos simulada  
- Prévia de perfil ao passar o mouse  
- Comunidades temáticas com conteúdo próprio  

---

## 📱 Design e Experiência

O layout foi inspirado no **visual original do Orkut**, com cores, tipografia e componentes que remetem aos anos 2000 — mas mantendo uma base **moderna, acessível e responsiva**.  

- **Design mobile-first**  
- **Paleta principal:** Rosa `#ed2590` e Azul `#5890ff`  
- **Fonte:** Inter  
- **Animações:** Framer Motion  
- **Estilo:** Botões com gradiente, cantos arredondados e sombras suaves  

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (vem com Node.js) ou **yarn** - [Instalar Yarn](https://yarnpkg.com/)
- **Git** - [Download aqui](https://git-scm.com/)

### 🔧 Passo a Passo da Instalação

#### 1️⃣ **Clone o Repositório**
```bash
git clone https://github.com/YanFellippe/orkut-reimagined.git
```

#### 2️⃣ **Entre no Diretório do Projeto**
```bash
cd orkut-reimagined
```

#### 3️⃣ **Instale as Dependências**
```bash
# Com npm
npm install

# OU com yarn
yarn install
```

#### 4️⃣ **Execute o Projeto em Modo de Desenvolvimento**
```bash
# Com npm
npm start

# OU com yarn
yarn start
```

#### 5️⃣ **Abra no Navegador**
O projeto será executado automaticamente em:
```
http://localhost:3000
```

### 🎯 **Primeiros Passos no Sistema**

1. **Acesse a página inicial** em `http://localhost:3000`
2. **Clique em "Entrar"** para ir para a tela de login
3. **Use um dos usuários de teste** (veja tabela abaixo)
4. **Explore o feed** e crie seu primeiro post nostálgico!

### 🏗️ **Build para Produção**

Para gerar uma versão otimizada para produção:

```bash
# Gere o build otimizado
npm run build

# Instale um servidor estático (se não tiver)
npm install -g serve

# Sirva os arquivos de produção
serve -s build
```

O build estará disponível em `http://localhost:3000` (ou outra porta indicada).

---

## 👥 Usuários de Demonstração

Para testar o sistema, use uma das contas pré-cadastradas:

| 📧 E-mail | 🔑 Senha | 👤 Nome | 🎭 Perfil |
|-----------|----------|---------|-----------|
| `maria@email.com` | `123456` | Maria Silva | Estudante de Design |
| `joao@email.com` | `123456` | João Santos | Desenvolvedor Frontend |
| `ana@email.com` | `123456` | Ana Costa | Marketing Digital |

> 💡 **Dica**: Após fazer login, explore o perfil, crie posts e navegue pelas comunidades!

---

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** - Biblioteca principal
- **React Router DOM** - Roteamento SPA
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações e transições
- **Lucide React** - Ícones modernos
- **React Hook Form** - Gerenciamento de formulários

### Ferramentas de Desenvolvimento
- **Create React App** - Configuração inicial
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Compatibilidade CSS

---

## 🎨 Design System

### 🎨 Cores Principais
```css
/* Orkut Pink */
--orkut-pink: #ed2590;
--orkut-pink-light: #f8d7da;
--orkut-pink-dark: #c21e73;

/* Orkut Blue */
--orkut-blue: #5890ff;
--orkut-light-blue: #e3f2fd;
```

### 📝 Tipografia
- **Fonte Principal**: Inter (moderna e legível)
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Hierarquia**: Títulos grandes, subtítulos, corpo, legendas

### 🧩 Componentes
- **Cards**: Bordas arredondadas, sombras suaves
- **Botões**: Gradientes, estados hover/active
- **Inputs**: Bordas destacadas, validação visual
- **Modais**: Overlay escuro, animações de entrada

---

## 🌟 Destaques Técnicos

### ⚡ Performance
- **Lazy Loading**: Componentes carregados sob demanda
- **Otimização de Bundle**: Code splitting automático
- **Imagens Otimizadas**: Unsplash com parâmetros de tamanho
- **Memoização**: React.memo em componentes pesados

### ♿ Acessibilidade
- **Navegação por Teclado**: Tab index apropriado
- **Screen Readers**: ARIA labels e roles
- **Contraste**: Cores com contraste adequado (WCAG AA)
- **Foco Visual**: Indicadores claros de foco

### 📱 Responsividade
- **Mobile First**: Design pensado para mobile
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid Flexível**: Layout adaptativo em todas as telas
- **Touch Friendly**: Botões e links com tamanho adequado

---

## 🎯 Fluxo de Navegação

### 🏠 Página Inicial (`/`)
- Landing page com preview do login/cadastro
- Links para as páginas de autenticação

### 🔐 Login (`/login`)
- Formulário de login com validação
- Redirecionamento automático para `/home` após login
- Mensagens de erro para credenciais inválidas

### 📝 Cadastro (`/signup`)
- Formulário completo de registro
- Validação de senhas e e-mails únicos
- Redirecionamento para login após cadastro

### 🏠 Home (`/home`) - Protegida
- Feed interativo com criação de posts
- Sidebar com perfil e navegação
- Header com busca e notificações
- Botão de logout

---

## 🧩 Aprendizados com o Projeto

Durante o desenvolvimento, pude reforçar e aplicar na prática conceitos como:

- **Estruturação de componentes** em React
- **Manipulação de estados e props**
- **Context API** e persistência com localStorage
- **Criação de rotas protegidas**
- **Boas práticas de responsividade e UX**
- **Organização de estilos** com Tailwind CSS
- **Animações suaves** com Framer Motion

Esse projeto também me ajudou a entender melhor **a importância de pensar na experiência do usuário**, mesmo em algo voltado à prática de código.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Este projeto é uma homenagem nostálgica, mas também um laboratório de tecnologias modernas.

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes
- Mantenha o espírito nostálgico do Orkut
- Use tecnologias modernas e boas práticas
- Documente suas mudanças
- Teste em diferentes dispositivos

---

## 🙏 Agradecimentos

- **Orkut Büyükkökten** - Criador da rede social que marcou uma geração
- **Comunidade Brasileira** - Por fazer do Orkut um fenômeno cultural
- **Desenvolvedores Modernos** - Pelas ferramentas incríveis que usamos hoje
- **Nostalgia** - Por nos lembrar de tempos mais simples e conectados

---

**Feito com café e muita nostalgia dos anos 2000**

*"Quem sou eu? Sou alguém que acredita que a tecnologia pode ser nostálgica e moderna ao mesmo tempo."*