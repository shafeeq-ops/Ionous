import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_ID = "G-G7L5HGVP36";

export const metadata: Metadata = {
  title: "Ionous — Mission-Critical Systems for Space & Defense",
  description:
    "Infrastructure and software consultancy for enterprise space companies and warfighting organizations.",
  metadataBase: new URL("https://ionous.ai"),
  openGraph: {
    title: "Ionous | Infrastructure & Software for Space & Defense",
    description:
      "Infrastructure and software consultancy for enterprise space and defense.",
    type: "website",
    url: "https://ionous.ai",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ionousai",
    title: "Ionous | Infrastructure & Software for Space & Defense",
    description:
      "Infrastructure and software consultancy for enterprise space and defense.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="fetch"
          href="/models/mission-systems.glb"
          crossOrigin="anonymous"
          type="model/gltf-binary"
        />
      </head>
      <body className="grain min-h-full flex flex-col">
        <SmoothScroll />
        {children}
        <CookieBanner />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
