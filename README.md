# BookSearcher

A modern web application built with Next.js that helps users discover books using the OpenLibrary API, featuring book search, randomization, and AI-assisted recommendations.

## Features

### 🔍 Book Search
- Search books by title and author
- Filter and browse through search results
- View detailed book information including covers, descriptions, and author details

### 🎲 Random Book Discovery
- "Get Me A Random Book" feature for discovering new reads
- Displays random books with cover images and basic information
- Perfect for readers looking to expand their literary horizons

### 🤖 AI-Assisted Recommendations
- AI-powered book recommendations based on user preferences
- Natural language processing for understanding complex reading preferences
- Rate-limited API to ensure fair usage

### 📚 Genre Exploration
- Browse books by different genres
- Interactive genre categories with hover effects
- Comprehensive genre listing and filtering

## Feature Features
- Ability to login/signup
- Ability to favorite books/AI suggestions
- Load more books

## Tech Stack

- **Frontend**: Next.js 15.0.4, React 19.0.0
- **Styling**: TailwindCSS, PostCSS
- **AI Integration**: OpenAI API
- **Book Data**: OpenLibrary API
- **TypeScript** for type safety
- **ESLint** for code quality

## API Integration

### OpenLibrary API
- Used for fetching book data, covers, and author information
- No authentication required
- Rate limiting implemented for fair usage
### OpenAI API (for AI recommendations)
- Requires API key for AI-powered recommendations
- Protected with rate limiting (5 requests per minute)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- [OpenLibrary](https://openlibrary.org/) for providing the comprehensive book API
- [OpenAI](https://openai.com/) for AI capabilities
- All contributors and users of BookSearcher
