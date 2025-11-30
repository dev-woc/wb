'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover</h1>
          <p className="text-gray-600 mt-1">Personalized recommendations just for you</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-xl font-bold">Today's Outfit Suggestion</h2>
              <p className="text-sm text-gray-600">Based on weather and your schedule</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-lg p-8 mb-4">
                <div className="text-center">
                  <div className="text-7xl mb-4">👔</div>
                  <div className="text-5xl mb-4">👖</div>
                  <div className="text-4xl">👟</div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Weather:</span> Sunny, 72°F
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Occasion:</span> Casual day out
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Why this works:</span> Light colors and breathable fabrics perfect for a warm day
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1">I'll Wear This</Button>
                <Button variant="outline" className="flex-1">Show Another</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Trending Now</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🔥</div>
                    <div>
                      <p className="font-semibold text-sm">Oversized Blazers</p>
                      <p className="text-xs text-gray-600">2.4k likes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">✨</div>
                    <div>
                      <p className="font-semibold text-sm">Neutral Tones</p>
                      <p className="text-xs text-gray-600">1.8k likes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">💫</div>
                    <div>
                      <p className="font-semibold text-sm">Vintage Denim</p>
                      <p className="text-xs text-gray-600">1.2k likes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Quick Stats</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Wardrobe Items</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Saved Outfits</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Following</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Community Favorites</h2>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="cursor-pointer group">
                  <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-2 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <div className="text-5xl mb-2">👗</div>
                      <div className="text-3xl">👠</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Summer Vibes</span>
                    <span className="text-sm text-gray-600">♥ {120 + i * 10}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
