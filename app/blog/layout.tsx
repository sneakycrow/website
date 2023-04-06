import React from "react";

export const metadata = {
  title: "award-winning blog by sneakycrow",
  description: "the thoughts of a mad scientist",
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
