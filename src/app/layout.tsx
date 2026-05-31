import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Unofficial Studios | Cinematic Broadcast & Media Production",
  description: "Founded by Himanshu Soni (@unofficialhimanshu). Indore's premium broadcasting and podcast production company. We craft premium celebrity interviews, sponsored vertical campaigns, and high-end video portfolios.",
  keywords: ["Podcast Production", "Broadcasting", "Media Production Indore", "The Unofficial Studios", "Himanshu Soni", "The Unofficial Talks", "Brand Video Sponsorships", "Studio Bookings Indore"],
  authors: [{ name: "Himanshu Soni" }],
  openGraph: {
    title: "The Unofficial Studios | Premium Podcast & Media Production",
    description: "Indore's leading production house for flagship podcasts, premium brand sponsored series, and professional studio bookings.",
    type: "website",
    locale: "en_IN",
    siteName: "The Unofficial Studios",
    images: [
      {
        url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "The Unofficial Studios - Production Desk Still",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Unofficial Studios | Premium Podcast & Media Production",
    description: "The premium digital headquarters for Indore's elite media production company, powered by Himanshu Soni.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-obsidian text-white selection:bg-brand-gold selection:text-brand-obsidian">
        {children}
      </body>
    </html>
  );
}
