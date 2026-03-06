'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import type { AnimeItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { isEpisodeSlug } from '@/lib/utils-episode';

interface HeroSliderProps {
animeList: AnimeItem[];
}

export function HeroSlider({ animeList }: HeroSliderProps) {
const [currentIndex, setCurrentIndex] = useState(0);
const [progress, setProgress] = useState(0);

// auto slide
useEffect(() => {
const slideInterval = setInterval(() => {
setCurrentIndex((prev) => (prev + 1) % animeList.length);
setProgress(0);
}, 5000);


return () => clearInterval(slideInterval);


}, [animeList.length]);

// progress bar
useEffect(() => {
const timer = setInterval(() => {
setProgress((p) => (p >= 100 ? 0 : p + 2));
}, 100);


return () => clearInterval(timer);


}, []);

if (!animeList || animeList.length === 0) return null;

return ( <div className="relative w-full h-64 md:h-[520px] overflow-hidden group">


  {/* progress bar */}
  <div
    className="absolute top-0 left-0 h-[3px] bg-red-500 z-30 transition-all"
    style={{ width: `${progress}%` }}
  />

  {/* slides */}
  {animeList.map((anime, index) => {
    const img = anime.thumbnail || anime.image || '';

    const isEpisode = isEpisodeSlug(anime.slug);
    const href = isEpisode ? `/watch/${anime.slug}` : `/anime/${anime.slug}`;

    return (
      <Link
        key={anime.slug}
        href={href}
        className={`absolute inset-0 transition-opacity duration-700 ${
          index === currentIndex
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* background image */}
        <div className="absolute inset-0">
          <Image
            src={img}
            alt={anime.title}
            fill
            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[4000ms]"
            priority={index === 0}
          />
        </div>

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-14 flex flex-col items-start gap-4">

          {/* trending badge */}
          <span className="px-4 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg uppercase tracking-wider">
            Trending
          </span>

          {/* title */}
          <h2 
          className="text-3xl md:text-6xl font-blackitalic text-white leading-tight max-w-3xl line-clamp-2 anime-title">{anime.title}
          </h2>

          {/* meta */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="uppercase tracking-wide">{anime.type}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>{anime.latest_episode || 'Ongoing'}</span>
          </div>

          {/* buttons */}
          <div className="mt-4 flex gap-3">

            <Button
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition font-semibold shadow-lg shadow-red-900/40"
              onClick={(e) => e.stopPropagation()}
            >
              <Play className="w-4 h-4 fill-white" />
              {isEpisode ? 'Watch Now' : 'View Anime'}
            </Button>

            {!isEpisode && (
              <Button
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                Details
              </Button>
            )}

          </div>

        </div>
      </Link>
    );
  })}

  {/* slider indicators */}
  <div className="absolute bottom-6 right-6 md:right-12 flex gap-2 z-20">
    {animeList.map((_, index) => (
      <button
        key={index}
        onClick={(e) => {
          e.preventDefault();
          setCurrentIndex(index);
          setProgress(0);
        }}
        className={`transition-all rounded-full ${
          index === currentIndex
            ? 'bg-red-500 w-8 h-3'
            : 'bg-white/40 hover:bg-white w-3 h-3'
        }`}
      />
    ))}
  </div>

</div>


);
}
