import React from "react";

export const metadata = {
  title: "award-winning blog by sneakycrow",
  description: "the thoughts of a mad scientist",
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">
      {children}
    </main>
  );
}
