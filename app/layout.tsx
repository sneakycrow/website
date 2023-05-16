import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { Metadata } from "next"; // If loading a variable font, you don't need to specify the font weight

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "sneakycrow, llc",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  description:
    "open source software, web development, and more by Zachary Corvidae",
  openGraph: {
    title: "sneakycrow",
    description:
      "open source software, web development, and more by Zachary Corvidae",
    url: "https://sneakycrow.dev",
    images: [
      {
        url: "https://sneakycrow.dev/logo_v2.svg",
        width: 200,
        height: 200,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
