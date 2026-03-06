'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Play, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsMobileOpen(false);
  };

  return (
    <header className="bg-slate-950/90 backdrop-blur-lg text-white sticky top-0 z-50 border-b border-white/5 shadow-lg">
      <div className="container mx-auto px-4 py-3">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">

            <div className="
            w-10 h-10
            rounded-xl
            bg-gradient-to-br
            from-purple-500
            via-indigo-500
            to-cyan-400
            flex items-center justify-center
            shadow-lg
            group-hover:scale-110
            transition
            ">
              <Play className="h-5 w-5 text-white fill-white" />
            </div>

            <span className="
            text-xl
            font-extrabold
            tracking-wide
            bg-gradient-to-r
            from-white
            via-cyan-300
            to-blue-400
            bg-clip-text
            text-transparent
            group-hover:brightness-125
            transition
            ">
              Ikirachiku
            </span>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">

            <Link
              href="/"
              className="relative hover:text-cyan-400 transition"
            >
              Home
            </Link>

            <Link
              href="/schedule"
              className="relative hover:text-cyan-400 transition"
            >
              Schedule
            </Link>

            <Link
              href="/batch"
              className="relative hover:text-cyan-400 transition"
            >
              Batch
            </Link>

          </nav>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">

            <Input
              type="text"
              placeholder="Search anime..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
              bg-white/5
              border-white/10
              rounded-full
              py-1.5
              px-4
              pl-10
              text-sm
              text-white
              w-44
              focus:w-64
              transition-all
              placeholder-gray-400
              focus:border-cyan-400
              "
            />

            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-gray-400" />

          </form>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">

              <Input
                type="text"
                placeholder="Search anime..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="
                bg-white/5
                border-white/10
                rounded-full
                py-1.5
                px-4
                pl-10
                text-sm
                text-white
                w-full
                placeholder-gray-400
                focus:border-cyan-400
                "
              />

              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-gray-400" />

            </form>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-2 text-gray-300">

              <Link
                href="/"
                className="hover:text-cyan-400 transition py-2"
                onClick={() => setIsMobileOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/schedule"
                className="hover:text-cyan-400 transition py-2"
                onClick={() => setIsMobileOpen(false)}
              >
                Schedule
              </Link>

              <Link
                href="/batch"
                className="hover:text-cyan-400 transition py-2"
                onClick={() => setIsMobileOpen(false)}
              >
                Batch
              </Link>

            </nav>

          </div>
        )}
      </div>
    </header>
  );
}