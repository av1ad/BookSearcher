# BookSearcher 📚

A comprehensive, modern book discovery platform built with Next.js that combines traditional search with AI-powered recommendations. Discover, explore, and curate your personal book collection with intelligent features and beautiful design.

![BookSearcher Banner](https://github.com/av1ad/BookSearcher/blob/main/public/thumbnail.png)

Check out [BookSearcher](https://book-searcher-self-six.vercel.app/)

## ✨ Features Overview

BookSearcher offers a complete book discovery experience with advanced functionality for book enthusiasts:

### 🔐 User Authentication & Profiles
- **Secure JWT-based authentication** with bcryptjs password hashing
- **User registration and login** with email validation
- **Persistent authentication** with localStorage session management
- **Protected routes** and middleware for secure access
- **User profile management** with dropdown navigation
- **Custom authentication context** for global state management

### 🔍 Advanced Search & Discovery
- **Real-time book search** across millions of books via OpenLibrary API
- **Intelligent pagination** with "Load More" functionality for seamless browsing
- **Search result statistics** showing total matches and current results
- **Advanced filtering** by title, author, and genre
- **Search performance optimization** with loading states and error handling
- **Responsive grid layouts** adapting to all screen sizes

### 🤖 AI-Powered Recommendations
- **OpenAI GPT-3.5-turbo integration** for personalized book suggestions
- **Natural language processing** to understand complex reading preferences
- **Structured AI responses** with Title, Author, Genre, Summary, and reasoning
- **Interactive example prompts** to guide user interactions
- **Smart rate limiting** (5 requests/minute) for fair API usage
- **Custom AI recommendation hook** with error handling and retry logic

### ❤️ Personal Book Collection
- **Favorites system** for building your personal library
- **Add/remove favorites** with instant visual feedback
- **Dedicated favorites page** with beautiful grid display
- **Book metadata preservation** including covers, authors, and publication info
- **Timestamp tracking** for when books were added to favorites
- **Protected favorites** requiring user authentication

### 🎯 Genre & Author Exploration
- **Curated genre categories** (Fiction, Non-Fiction, Academic, and more)
- **Genre-specific browsing pages** with infinite scroll loading
- **Author-dedicated pages** with complete bibliographies
- **Author biographical information** including birth/death dates and bio
- **Subject-based filtering** for targeted book discovery
- **Interactive genre cards** with hover effects and smooth transitions

### 🎲 Serendipitous Discovery
- **Random book generator** for adventurous readers
- **Book randomizer feature** with full metadata display
- **Surprise me functionality** for breaking reading routines
- **Quality filtering** ensuring random books have covers and complete information

### 🎨 Modern UI/UX Design
- **Glass-morphism design system** with backdrop blur effects
- **Custom color palette** with green-themed branding (#a9c5a0, #758173)
- **Smooth animations** and micro-interactions throughout
- **Loading states** with elegant skeleton screens
- **Mobile-first responsive design** optimized for all devices
- **Interactive elements** with hover states and smooth transitions
- **Accessibility features** with proper ARIA labels and keyboard navigation

## 🛠️ Technical Architecture

### Frontend Stack
```typescript
- Next.js 15.2.4      // Latest React framework with App Router
- React 19.0.0        // Modern React with latest features
- TypeScript          // Type safety throughout application
- TailwindCSS         // Utility-first CSS framework
- PostCSS            // CSS processing and optimization
```

### Backend & Database
```typescript
- Next.js API Routes  // Serverless backend functions
- PostgreSQL         // Robust relational database
- Prisma ORM        // Type-safe database operations
- JWT Authentication // Secure token-based auth
- Custom middleware  // Rate limiting and security
```

### External Integrations
```typescript
- OpenLibrary API    // 40+ million book records
- OpenAI GPT-3.5     // AI-powered recommendations
- Vercel Analytics   // Performance monitoring
- Vercel Speed Insights // Web vitals tracking
```

### Development & Deployment
```typescript
- Turbopack         // Fast development builds
- ESLint            // Code quality and consistency
- Vercel Platform   // Seamless deployment and hosting
- Environment vars  // Secure configuration management
```

## 🏗️ Project Structure

```
BookSearcher/
├── src/app/
│   ├── (components)/          # Reusable UI components
│   │   ├── Header.tsx         # Navigation with auth
│   │   ├── Footer.tsx         # Site footer
│   │   └── ...
│   ├── api/                   # Backend API routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── ai/               # AI recommendation endpoints
│   │   └── favorites/        # Favorites CRUD operations
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # Authentication management
│   │   ├── useSearchBooks.ts # Search functionality
│   │   ├── useGenreBooks.ts  # Genre browsing
│   │   ├── useAuthorBooks.ts # Author page data
│   │   └── useFavorites.ts   # Favorites management
│   ├── contexts/             # React context providers
│   │   └── AuthContext.tsx   # Global auth state
│   ├── authors/[author]/     # Dynamic author pages
│   ├── genres/[genre]/       # Dynamic genre pages
│   ├── books/[id]/          # Individual book pages
│   ├── search/              # Search results page
│   ├── favorites/           # User favorites page
│   ├── ai-recommendations/  # AI suggestions page
│   └── randomizer/          # Random book discovery
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database version control
└── public/                  # Static assets
```

## 🔧 Custom Hooks & State Management

### Authentication Hook
```typescript
const { user, login, logout, isAuthenticated, loading } = useAuth();
```

### Search Management
```typescript
const { 
  books, 
  isLoading, 
  isLoadingMore, 
  hasMore, 
  loadMore, 
  totalFound 
} = useSearchBooks(query);
```

### Favorites Management
```typescript
const { 
  favorites, 
  addToFavorites, 
  removeFromFavorites, 
  isFavorite 
} = useFavorites();
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- OpenAI API key (for AI recommendations)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BookSearcher.git
   cd BookSearcher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/booksearcher"
   NEXTAUTH_SECRET="your-secret-key"
   JWT_SECRET="your-jwt-secret"
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Favorites
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add book to favorites
- `DELETE /api/favorites/[id]` - Remove from favorites

### AI Recommendations
- `POST /api/ai/recommend` - Get AI book recommendations

## 🔒 Security Features

- **Rate limiting** on AI endpoints (5 requests/minute)
- **Input validation** and sanitization
- **JWT token verification** for protected routes
- **Password hashing** with bcryptjs
- **CORS protection** and security headers
- **Environment variable protection** for sensitive data

## 🎯 Performance Optimizations

- **Image optimization** with Next.js Image component
- **Lazy loading** for book covers and content
- **Code splitting** for optimal bundle sizes
- **Custom caching** strategies for API responses
- **Skeleton loading states** for smooth UX
- **Debounced search** to reduce API calls

## 📱 Mobile Experience

- **Responsive design** with Tailwind breakpoints
- **Touch-optimized** interactions and buttons
- **Mobile navigation** with slide-out menu
- **Optimized images** for various screen densities
- **Progressive enhancement** for offline functionality

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass before submitting PR
- Update README.md for new features

## 📄 License

This project is licensed under the MIT License

## 🙏 Acknowledgments

- **[OpenLibrary](https://openlibrary.org/)** - Comprehensive book database API
- **[OpenAI](https://openai.com/)** - AI-powered recommendation engine
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform
- **[Prisma](https://prisma.io/)** - Modern database toolkit
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework

## 📊 Project Stats

- **40+ million books** available through OpenLibrary API
- **AI-powered recommendations** with GPT-3.5-turbo
- **Fully responsive** design supporting all devices
- **Type-safe** codebase with TypeScript
- **Production-ready** with comprehensive error handling
- **SEO optimized** with proper meta tags and structure

---

**Built with ❤️ and lots of ☕ by Aviad Churaman**

*Happy reading! 📖*