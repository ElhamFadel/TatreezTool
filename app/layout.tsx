import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tatreez Design Studio",
    template: "%s | Tatreez Design Studio",
  },
  description: "Create and share Palestinian embroidery (tatreez) patterns with an intuitive design tool.",
  keywords: ["tatreez", "Palestinian embroidery", "embroidery design", "cross-stitch", "pattern maker"],
  openGraph: {
    title: "Tatreez Design Studio",
    description: "Create and share Palestinian embroidery patterns.",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
