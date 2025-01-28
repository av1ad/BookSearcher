import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "BookSearcher | Discover Your Next Great Read",
  description:
    "Your AI-powered book discovery companion. Find personalized book recommendations, explore new genres, and uncover hidden literary gems with our intelligent search engine.",
  openGraph: {
    title: "BookSearcher | AI-Powered Book Discovery",
    description:
      "🤖 Get personalized book recommendations\n📚 Explore millions of books\n✨ Discover hidden literary gems\nFind your next favorite book with AI-powered search!",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "BookSearcher - AI-powered book discovery platform",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "BookSearcher",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookSearcher | Find Your Next Great Read 📚",
    description:
      "Discover your perfect book match with AI-powered recommendations. From bestsellers to hidden gems, find exactly what you want to read next! ✨",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "BookSearcher - AI-powered book discovery platform",
      },
    ],
    creator: "@menstruating",
  },
  icons: {
    icon: "/logo.png",
  },
  keywords: [
    "book search",
    "AI book recommendations",
    "book discovery",
    "reading recommendations",
    "find books",
    "book finder",
    "personalized reading",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <SpeedInsights />
      <Analytics />
    </html>
  );
}
