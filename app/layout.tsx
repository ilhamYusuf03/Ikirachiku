import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://animestream.vercel.app"),

  title: {
    default: "AnimeStream - Streaming Anime Subtitle Indonesia",
    template: "%s | AnimeStream",
  },

  description:
    "Platform streaming anime subtitle Indonesia dengan update episode terbaru setiap hari. Nonton anime ongoing, completed, dan episode terbaru dalam kualitas HD.",

  keywords: [
    "anime streaming",
    "anime subtitle indonesia",
    "nonton anime",
    "anime terbaru",
    "anime ongoing",
    "anime completed",
    "anime hd",
  ],

  authors: [{ name: "Ilham Yusuf" }],
  creator: "Ilham Yusuf",
  publisher: "AnimeStream",

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://animestream.vercel.app",
    siteName: "AnimeStream",
    title: "AnimeStream - Streaming Anime Subtitle Indonesia",
    description:
      "Streaming anime subtitle Indonesia dengan update episode terbaru setiap hari.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AnimeStream - Anime Streaming Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AnimeStream - Streaming Anime Subtitle Indonesia",
    description:
      "Streaming anime subtitle Indonesia dengan update episode terbaru setiap hari.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${bebas.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href="https://animestream.vercel.app" />
        <meta name="theme-color" content="#020617" />
      </head>

      <body className="font-sans min-h-screen flex flex-col bg-slate-950 text-white antialiased">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}