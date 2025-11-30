'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

type ClothingCategory = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';

export default function WardrobePage() {
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | 'all'>('all');

  const categories: { value: ClothingCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wardrobe</h1>
            <p className="text-gray-600 mt-1">Manage your clothing collection</p>
          </div>
          <Button size="lg">+ Add Item</Button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card hover className="cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg flex items-center justify-center">
                <span className="text-6xl">👕</span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900">Sample T-Shirt</h3>
                <p className="text-sm text-gray-600">Casual, Blue</p>
              </div>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg flex items-center justify-center">
                <span className="text-6xl">👖</span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900">Denim Jeans</h3>
                <p className="text-sm text-gray-600">Casual, Dark Blue</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-2 border-dashed border-gray-300 hover:border-purple-400 cursor-pointer transition-colors"
          >
            <CardContent className="p-0">
              <div className="aspect-square rounded-t-lg flex items-center justify-center flex-col gap-2">
                <div className="text-4xl text-gray-400">+</div>
                <p className="text-sm text-gray-600">Add New Item</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
