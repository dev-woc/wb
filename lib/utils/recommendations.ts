import { ClothingItem, Outfit } from '@prisma/client';
import { WeatherData } from './weather';

export interface RecommendationReason {
  reason: string;
  score: number;
}

export interface OutfitRecommendation {
  items: ClothingItem[];
  reasons: RecommendationReason[];
  totalScore: number;
}

export function getWeatherBasedRecommendations(
  items: ClothingItem[],
  weather?: WeatherData | null
): OutfitRecommendation[] {
  if (!weather) {
    return getRandomOutfitRecommendations(items);
  }

  const recommendations: OutfitRecommendation[] = [];
  const temp = weather.temp;
  const condition = weather.condition.toLowerCase();

  let recommendedCategories: string[] = [];
  let reasons: RecommendationReason[] = [];

  if (temp < 40) {
    recommendedCategories = ['outerwear', 'tops', 'bottoms'];
    reasons.push({
      reason: `Cold weather (${temp}°F) - layering recommended`,
      score: 10,
    });
  } else if (temp < 60) {
    recommendedCategories = ['tops', 'bottoms', 'outerwear'];
    reasons.push({
      reason: `Cool weather (${temp}°F) - light jacket suggested`,
      score: 8,
    });
  } else if (temp < 75) {
    recommendedCategories = ['tops', 'bottoms'];
    reasons.push({
      reason: `Comfortable weather (${temp}°F) - perfect for casual wear`,
      score: 9,
    });
  } else {
    recommendedCategories = ['tops', 'bottoms', 'dresses'];
    reasons.push({
      reason: `Warm weather (${temp}°F) - light and breathable fabrics ideal`,
      score: 9,
    });
  }

  if (condition.includes('rain')) {
    reasons.push({
      reason: 'Rainy conditions - waterproof options recommended',
      score: 8,
    });
  } else if (condition.includes('sun') || condition.includes('clear')) {
    reasons.push({
      reason: 'Sunny day - UV protection and light colors suggested',
      score: 7,
    });
  }

  const categorizedItems: { [key: string]: ClothingItem[] } = {};
  items.forEach((item) => {
    if (!categorizedItems[item.category]) {
      categorizedItems[item.category] = [];
    }
    categorizedItems[item.category].push(item);
  });

  const outfitItems: ClothingItem[] = [];
  recommendedCategories.forEach((category) => {
    const availableItems = categorizedItems[category] || [];
    if (availableItems.length > 0) {
      const randomItem =
        availableItems[Math.floor(Math.random() * availableItems.length)];
      outfitItems.push(randomItem);
    }
  });

  if (outfitItems.length > 0) {
    const totalScore = reasons.reduce((sum, r) => sum + r.score, 0);
    recommendations.push({
      items: outfitItems,
      reasons,
      totalScore,
    });
  }

  return recommendations;
}

export function getOccasionBasedRecommendations(
  items: ClothingItem[],
  occasion: string
): OutfitRecommendation[] {
  const recommendations: OutfitRecommendation[] = [];
  const filteredItems = items.filter(
    (item) => item.occasion?.includes(occasion) || !item.occasion
  );

  const reasons: RecommendationReason[] = [
    {
      reason: `Perfect for ${occasion} occasions`,
      score: 10,
    },
  ];

  const categorizedItems: { [key: string]: ClothingItem[] } = {};
  filteredItems.forEach((item) => {
    if (!categorizedItems[item.category]) {
      categorizedItems[item.category] = [];
    }
    categorizedItems[item.category].push(item);
  });

  const outfitItems: ClothingItem[] = [];
  const categories = ['tops', 'bottoms', 'shoes'];

  categories.forEach((category) => {
    const availableItems = categorizedItems[category] || [];
    if (availableItems.length > 0) {
      const randomItem =
        availableItems[Math.floor(Math.random() * availableItems.length)];
      outfitItems.push(randomItem);
    }
  });

  if (outfitItems.length > 0) {
    recommendations.push({
      items: outfitItems,
      reasons,
      totalScore: 10,
    });
  }

  return recommendations;
}

export function getRandomOutfitRecommendations(
  items: ClothingItem[]
): OutfitRecommendation[] {
  const categorizedItems: { [key: string]: ClothingItem[] } = {};
  items.forEach((item) => {
    if (!categorizedItems[item.category]) {
      categorizedItems[item.category] = [];
    }
    categorizedItems[item.category].push(item);
  });

  const outfitItems: ClothingItem[] = [];
  const categories = ['tops', 'bottoms'];

  categories.forEach((category) => {
    const availableItems = categorizedItems[category] || [];
    if (availableItems.length > 0) {
      const randomItem =
        availableItems[Math.floor(Math.random() * availableItems.length)];
      outfitItems.push(randomItem);
    }
  });

  const reasons: RecommendationReason[] = [
    {
      reason: 'Based on your wardrobe items',
      score: 5,
    },
  ];

  return outfitItems.length > 0
    ? [{ items: outfitItems, reasons, totalScore: 5 }]
    : [];
}

export function getColorCoordinatedOutfits(
  items: ClothingItem[]
): OutfitRecommendation[] {
  const colorHarmony: { [key: string]: string[] } = {
    blue: ['white', 'gray', 'black', 'beige'],
    red: ['black', 'white', 'gray', 'navy'],
    black: ['white', 'gray', 'red', 'pink', 'blue'],
    white: ['black', 'blue', 'red', 'green', 'navy'],
    gray: ['black', 'white', 'blue', 'pink'],
    green: ['white', 'beige', 'brown', 'black'],
    pink: ['gray', 'white', 'black', 'navy'],
    beige: ['white', 'brown', 'black', 'blue'],
  };

  const recommendations: OutfitRecommendation[] = [];

  return recommendations;
}
