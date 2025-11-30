'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DesignersPage() {
  const designers = [
    {
      id: 1,
      name: 'Maya Chen',
      brandName: 'Urban Minimalist',
      followers: 1234,
      verified: true,
      avatar: '👩',
      bio: 'Sustainable fashion with clean lines',
    },
    {
      id: 2,
      name: 'Alex Rivera',
      brandName: 'Street Couture',
      followers: 892,
      verified: false,
      avatar: '👨',
      bio: 'Bold streetwear meets high fashion',
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      brandName: 'Atelier Sophie',
      followers: 2156,
      verified: true,
      avatar: '👩',
      bio: 'French-inspired romantic designs',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover Designers</h1>
          <p className="text-gray-600 mt-1">Support emerging talent and find unique pieces</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designers.map((designer) => (
            <Card key={designer.id} hover className="cursor-pointer">
              <CardContent>
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{designer.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{designer.brandName}</h3>
                      {designer.verified && (
                        <span className="text-blue-500" title="Verified">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{designer.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{designer.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{designer.bio}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-md flex items-center justify-center text-2xl">
                    👕
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-md flex items-center justify-center text-2xl">
                    👗
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-md flex items-center justify-center text-2xl">
                    🧥
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Follow
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
