'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function OutfitsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Outfits</h1>
            <p className="text-gray-600 mt-1">Create and save outfit combinations</p>
          </div>
          <Button size="lg">+ Create Outfit</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card hover className="cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-orange-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">👔</div>
                  <div className="text-4xl">👖</div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Casual Friday</h3>
                <p className="text-sm text-gray-600 mb-3">Perfect for a relaxed office day</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="text-red-500 hover:text-red-600">♥ 24</button>
                    <button className="text-gray-500 hover:text-gray-600">⋯ Save</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">👗</div>
                  <div className="text-4xl">👠</div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Date Night</h3>
                <p className="text-sm text-gray-600 mb-3">Elegant and sophisticated</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="text-red-500 hover:text-red-600">♥ 42</button>
                    <button className="text-gray-500 hover:text-gray-600">⋯ Save</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-gray-300 hover:border-purple-400 cursor-pointer transition-colors">
            <CardContent className="p-0">
              <div className="aspect-[3/4] rounded-t-lg flex items-center justify-center flex-col gap-2">
                <div className="text-4xl text-gray-400">+</div>
                <p className="text-sm text-gray-600">Create New Outfit</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
