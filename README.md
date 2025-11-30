# StyleHub - Fashion & Design App

A modern fashion app that helps people choose what to wear and enables aspiring designers to showcase their work.

## Features

### For Users
- **Virtual Wardrobe**: Catalog your clothing items with photos, categories, colors, and tags
- **Outfit Recommendations**: Get AI-powered suggestions based on weather, occasion, and personal style
- **Outfit Builder**: Create and save outfit combinations from your wardrobe
- **Social Features**: Like, save, and share outfits with the community

### For Designers
- **Designer Showcase**: Create a designer profile and showcase your brand
- **Collections**: Organize your designs into seasonal or themed collections
- **Reach**: Get discovered by users looking for unique pieces
- **Verified Status**: Build credibility with verified designer accounts

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Image Upload**: Cloudinary
- **Weather API**: OpenWeatherMap

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
wardrobe_app/
├── app/                    # Next.js app directory
│   ├── wardrobe/          # Virtual wardrobe pages
│   ├── outfits/           # Outfit management
│   ├── designers/         # Designer showcase
│   └── discover/          # Recommendations & discovery
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── wardrobe/         # Wardrobe-specific components
│   ├── designer/         # Designer-specific components
│   ├── social/           # Social feature components
│   └── layout/           # Layout components
├── lib/                  # Utilities and configurations
│   ├── db/              # Database client
│   └── api/             # API utilities
├── prisma/              # Database schema and migrations
└── types/               # TypeScript type definitions
```

## Database Schema

The app uses the following main models:
- **User**: User accounts (can be regular users or designers)
- **ClothingItem**: Individual clothing pieces
- **Outfit**: Saved outfit combinations
- **Designer**: Designer profile information
- **Collection**: Designer collections
- **Follow/Like/Save**: Social interaction models

## Implemented Features

- [x] Authentication with NextAuth.js (credentials-based)
- [x] Login and signup pages with role selection (user/designer)
- [x] Image upload with Cloudinary integration
- [x] Complete API routes for wardrobe CRUD operations
- [x] Complete API routes for outfit management
- [x] Social features API (like, save, follow)
- [x] Weather API integration (OpenWeatherMap)
- [x] AI-powered outfit recommendation engine
- [x] Virtual try-on feature with live camera feed

## Roadmap

- [ ] Advanced body tracking with TensorFlow.js/MediaPipe
- [ ] 3D clothing rendering with realistic draping
- [ ] Size and fit analysis using ML
- [ ] Add search and filtering
- [ ] Implement real-time notifications
- [ ] Mobile app with React Native
- [ ] Designer verification system
- [ ] Payment integration for designer marketplace
- [ ] Multi-language support
- [ ] Social feed and community features

## Contributing

This is a personal project, but feedback and suggestions are welcome!

## License

MIT
