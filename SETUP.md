# StyleHub Setup Guide

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A text editor (VS Code recommended)

## Quick Start

1. **Clone or navigate to the project**
```bash
cd wardrobe_app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your API keys (see Configuration section below)

4. **Set up the database**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to http://localhost:3001

## Configuration

### Required Environment Variables

#### 1. Database (Already Configured)
```env
DATABASE_URL="file:./dev.db"
```
SQLite is used for development. No additional setup needed.

#### 2. NextAuth Secret (Required)
Generate a secure random string:
```bash
openssl rand -base64 32
```

Add to `.env`:
```env
AUTH_SECRET="paste-generated-secret-here"
AUTH_URL="http://localhost:3001"
```

#### 3. Cloudinary (Optional - for image uploads)

**Sign up for free at:** https://cloudinary.com

After signing up:
1. Go to Dashboard
2. Copy your Cloud Name, API Key, and API Secret
3. Add to `.env`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Note:** Without Cloudinary, image upload will not work, but the rest of the app will function.

#### 4. OpenWeatherMap API (Optional - for weather-based recommendations)

**Sign up for free at:** https://openweathermap.org/api

After signing up:
1. Go to API Keys section
2. Copy your API key
3. Add to `.env`:

```env
OPENWEATHER_API_KEY="your-api-key"
```

**Note:** Free tier includes 1,000 calls/day which is plenty for development.

## Database Management

### View Database with Prisma Studio
```bash
npx prisma studio
```

This opens a web UI at http://localhost:5555 where you can view and edit database records.

### Create Database Migration
After changing `prisma/schema.prisma`:
```bash
npx prisma migrate dev --name describe_your_changes
```

### Reset Database (WARNING: Deletes all data)
```bash
npx prisma migrate reset
```

## Testing the App

### 1. Create an Account
1. Navigate to http://localhost:3001
2. Click "Sign Up"
3. Fill in your details
4. Choose "User" or "Designer" role
5. Click "Create Account"

### 2. Log In
1. Go to login page
2. Enter your email and password
3. You'll be redirected to the wardrobe page

### 3. Test Features

**Wardrobe:**
- View wardrobe items by category
- Click "Add Item" to upload clothing (requires Cloudinary)

**Outfits:**
- Create outfit combinations
- Like and save outfits

**Virtual Try-On:**
- Click "Virtual Try-On" in navigation
- Allow camera access
- Select items to preview on yourself

**Designers:**
- Browse designer profiles
- Follow designers

**Discover:**
- View outfit recommendations
- See trending styles

## Development Tips

### Hot Reload
The app uses Next.js hot reload. Save any file and see changes immediately.

### Type Safety
This project uses TypeScript. The editor will show type errors as you code.

### Database Schema
All database models are defined in `prisma/schema.prisma`.

After changing the schema:
1. Run `npx prisma migrate dev`
2. Run `npx prisma generate`

### API Routes
All API endpoints are in the `app/api/` directory:
- `/api/auth/*` - Authentication
- `/api/wardrobe/*` - Wardrobe CRUD
- `/api/outfits/*` - Outfit management
- `/api/social/*` - Like, save, follow
- `/api/recommendations` - AI recommendations
- `/api/weather` - Weather data

### Testing API Endpoints

Using curl:
```bash
# Get weather
curl "http://localhost:3001/api/weather?city=New York"

# Get recommendations (requires authentication)
curl -H "Cookie: your-session-cookie" \
  "http://localhost:3001/api/recommendations?city=Boston"
```

Using Postman or Insomnia is recommended for authenticated requests.

## Troubleshooting

### Port 3000 is already in use
The app will automatically use port 3001 if 3000 is taken. Check the terminal output for the actual port.

### Database errors
```bash
# Reset and recreate database
npx prisma migrate reset
npx prisma generate
```

### Camera not working in Try-On
- HTTPS is required in production
- For development, http://localhost works
- Check browser permissions for camera access

### Image upload not working
- Verify Cloudinary credentials in `.env`
- Create an upload preset in Cloudinary dashboard
- Set preset to "unsigned" or update the upload widget configuration

### Authentication errors
- Make sure AUTH_SECRET is set in `.env`
- Clear browser cookies and try again
- Check that database has the latest auth tables

## Production Deployment

### Environment Variables
Set all environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- Railway: Project → Variables

### Database
For production, migrate to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
}
```

2. Update DATABASE_URL to PostgreSQL connection string

3. Run migrations:
```bash
npx prisma migrate deploy
```

### Build
```bash
npm run build
npm start
```

### Recommended Hosting
- **Vercel**: Best for Next.js (free tier available)
- **Railway**: Great for full-stack apps with database
- **Netlify**: Good alternative to Vercel

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## Getting Help

If you encounter issues:
1. Check this setup guide
2. Review error messages in the terminal
3. Check browser console for frontend errors
4. Review the code comments in the project files

## What's Next?

After setup, check out:
- `FEATURES.md` - Detailed feature documentation
- `VIRTUAL_TRY_ON.md` - Advanced AR implementation guide
- `types/index.ts` - TypeScript type definitions
- `prisma/schema.prisma` - Database schema

Happy coding!
