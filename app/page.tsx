import type { Metadata } from "next";
import { Suspense } from "react";
import { getHome } from "@/lib/api";
import { HeroSlider } from "@/components/hero-slider";
import { InfiniteAnimeGrid } from "@/components/infinite-anime-grid";

export const metadata: Metadata = {
  title: "Ikirachiku - Watch Latest Anime Online",
  description:
    "Ikirachiku adalah platform streaming anime subtitle Indonesia dengan update episode terbaru setiap hari. Temukan anime ongoing, completed, dan episode terbaru dalam kualitas HD.",
  openGraph: {
    title: "Ikirachiku - Anime Streaming Platform",
    description:
      "Streaming anime subtitle Indonesia dengan update harian dan kualitas HD.",
    url: "https://animestream.vercel.app",
    type: "website",
  },
};

async function HomeSection() {
  const response = await getHome(1);
  const animeData = response.data.anime;

  const featuredAnime = animeData.slice(0, 5);

  return (
    <>
      {/* Featured Anime Slider */}
      <section className="mb-10">
        <HeroSlider animeList={featuredAnime} />
      </section>

      {/* Latest Anime */}
      <section className="container mx-auto px-4 mb-14">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-blue-500 rounded-full"></span>
          Latest Anime Releases
        </h1>

        <InfiniteAnimeGrid
          initialAnime={animeData}
          initialPage={1}
        />
      </section>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div className="h-64 md:h-[480px] bg-slate-900 animate-pulse rounded-lg" />

      <section className="container mx-auto px-4 mb-14 mt-8">
        <div className="h-8 w-52 bg-slate-900 rounded mb-6"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[3/4] bg-slate-900 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeSection />
    </Suspense>
  );
}