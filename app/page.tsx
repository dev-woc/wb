import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StyleHub
              </h1>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white hover:from-purple-700 hover:to-pink-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Your Personal Style Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize your wardrobe, get outfit recommendations, and discover amazing designs from emerging designers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">👔</div>
            <h3 className="text-xl font-semibold mb-2">Virtual Wardrobe</h3>
            <p className="text-gray-600">
              Catalog all your clothing items with photos and details. Always know what you have.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">
              Get AI-powered outfit suggestions based on weather, occasion, and your personal style.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Designer Showcase</h3>
            <p className="text-gray-600">
              Discover and support aspiring designers. Shop unique pieces you won't find anywhere else.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-lg font-medium text-white hover:from-purple-700 hover:to-pink-700"
          >
            Get Started Free
          </Link>
        </div>
      </main>
    </div>
  );
}
