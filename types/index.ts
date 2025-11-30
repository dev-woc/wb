export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'designer';
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClothingItem {
  id: string;
  userId: string;
  designerId?: string;
  name: string;
  category: ClothingCategory;
  color: string;
  brand?: string;
  season?: Season[];
  occasion?: Occasion[];
  imageUrl: string;
  tags: string[];
  isDesignerPiece: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Outfit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  items: string[]; // ClothingItem IDs
  occasion?: Occasion;
  season?: Season;
  imageUrl?: string;
  likes: number;
  saves: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Designer {
  id: string;
  userId: string;
  brandName: string;
  bio: string;
  website?: string;
  instagram?: string;
  collections: Collection[];
  followers: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  designerId: string;
  name: string;
  description: string;
  items: string[]; // ClothingItem IDs
  coverImage: string;
  season?: string;
  year?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  outfitId: string;
  createdAt: Date;
}

export interface Save {
  id: string;
  userId: string;
  outfitId: string;
  createdAt: Date;
}

export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories'
  | 'activewear'
  | 'swimwear';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export type Occasion =
  | 'casual'
  | 'work'
  | 'formal'
  | 'party'
  | 'athletic'
  | 'beach'
  | 'date';

export interface OutfitRecommendation {
  outfit: Outfit;
  reason: string;
  weatherSuitability?: number;
  occasionMatch?: number;
}
