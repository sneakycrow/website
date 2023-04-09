import "./globals.css";
import {Inter} from "next/font/google";
import React from "react";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "sneakycrow, llc",
  description:
    "open source software, web development, and more by Zachary Sohovich",
  openGraph: {
    title: "sneakycrow",
    url: "https://sneakycrow.dev",
    images: [
      {
        url: "https://sneakycrow.dev/logo_v2.png",
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
