'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/wardrobe', label: 'My Wardrobe' },
    { href: '/outfits', label: 'Outfits' },
    { href: '/try-on', label: 'Virtual Try-On' },
    { href: '/designers', label: 'Designers' },
    { href: '/discover', label: 'Discover' },
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StyleHub
              </h1>
            </Link>
            <div className="hidden md:flex gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
