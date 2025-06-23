# Deployment Guide

## Vercel Deployment

### 1. Environment Variables
Add these environment variables in your Vercel project settings:

```bash
DATABASE_URL="your-production-database-url"
OPENAI_API_KEY="sk-your-openai-api-key"
JWT_SECRET="your-cryptographically-secure-secret"
NODE_ENV="production"
```

### 2. Database Setup

#### Option A: Vercel Postgres (Recommended)
```bash
# Create a Vercel Postgres database
vercel storage create postgres

# Get your DATABASE_URL from Vercel dashboard
# It will look like: postgres://username:password@host:port/database?sslmode=require
```

#### Option B: PlanetScale
```bash
# Create a PlanetScale database
# Get connection string from PlanetScale dashboard
# Format: mysql://username:password@host:port/database?sslaccept=strict
```

#### Option C: Railway
```bash
# Create a PostgreSQL database on Railway
# Get connection string from Railway dashboard
```

### 3. Schema Migration
After setting up your database, run the schema migration:

```bash
# In your local environment with production DATABASE_URL
npx prisma db push

# Or deploy and let Prisma handle it automatically
```

### 4. Build Configuration
The project is already configured for Vercel with:
- `prisma generate` in build script
- `postinstall` hook for dependency management
- Proper Next.js configuration

### 5. Deploy
```bash
# Using Vercel CLI
vercel

# Or connect your GitHub repository to Vercel dashboard
```

## Security Checklist

### Environment Variables
- ✅ `JWT_SECRET` is cryptographically secure (32+ characters)
- ✅ `OPENAI_API_KEY` is valid and active
- ✅ `DATABASE_URL` points to production database
- ✅ No sensitive data in source code

### Database Security
- ✅ Database has SSL enabled
- ✅ Database credentials are not exposed
- ✅ Connection pooling is configured

### Application Security
- ✅ Rate limiting is enabled
- ✅ Security headers are configured
- ✅ Input validation is implemented
- ✅ CORS is properly configured

## Post-Deployment

### 1. Test Authentication
- Register a new user
- Login with created user
- Test password validation
- Verify JWT token generation

### 2. Test Features
- Search for books
- Test load more functionality
- Add/remove favorites
- Test AI recommendations

### 3. Monitor Performance
- Check Vercel Analytics
- Monitor API response times
- Watch for rate limiting triggers
- Check error logs

## Troubleshooting

### Build Issues
```bash
# If Prisma client generation fails
npm run postinstall

# If TypeScript errors occur
npm run lint
```

### Database Issues
```bash
# Reset database schema
npx prisma db push --force-reset

# Check database connection
npx prisma db pull
```

### Environment Issues
- Verify all environment variables are set in Vercel
- Check variable names match exactly
- Ensure no trailing spaces in values