'use client';

import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function VirtualTryOnPage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sampleItems = [
    { id: '1', name: 'Blue T-Shirt', emoji: '👕', color: 'blue' },
    { id: '2', name: 'Red Dress', emoji: '👗', color: 'red' },
    { id: '3', name: 'Black Jacket', emoji: '🧥', color: 'black' },
    { id: '4', name: 'Denim Jeans', emoji: '👖', color: 'blue' },
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Virtual Try-On</h1>
          <p className="text-gray-600 mt-1">
            See how clothes look on you using AR technology
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Mirror View</h2>
                  {isCameraActive ? (
                    <Button variant="secondary" onClick={stopCamera}>
                      Stop Camera
                    </Button>
                  ) : (
                    <Button onClick={startCamera}>Start Camera</Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-[3/4]">
                  {isCameraActive ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover mirror"
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full"
                      />
                      {selectedItem && (
                        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="text-9xl opacity-70">
                            {sampleItems.find((i) => i.id === selectedItem)?.emoji}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">📸</div>
                        <p className="text-lg">
                          Click "Start Camera" to begin virtual try-on
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {isCameraActive && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Pro Tip:</strong> Stand in front of a mirror or well-lit
                      area for best results. Select an item from the sidebar to try it on.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Your Wardrobe</h2>
                <p className="text-sm text-gray-600">Select items to try on</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        selectedItem === item.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{item.emoji}</div>
                        <div className="text-left flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600 capitalize">
                            {item.color}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">How it works:</h3>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Allow camera access when prompted</li>
                    <li>Position yourself in the frame</li>
                    <li>Select clothing items to preview</li>
                    <li>See how different items look on you</li>
                  </ol>
                </div>

                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-900">
                    <strong>Coming Soon:</strong> Advanced AR features with realistic
                    clothing overlay, body tracking, and 3D rendering!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Advanced Features (Roadmap)</h2>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🎯 Body Tracking</h3>
                  <p className="text-sm text-gray-600">
                    Real-time pose detection to accurately position clothing items
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🎨 Realistic Rendering</h3>
                  <p className="text-sm text-gray-600">
                    3D cloth simulation with proper draping and fabric physics
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">📏 Size Matching</h3>
                  <p className="text-sm text-gray-600">
                    AI-powered size recommendations based on your measurements
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🌈 Color Variations</h3>
                  <p className="text-sm text-gray-600">
                    Try different colors and patterns of the same item instantly
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <style jsx>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}
