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
    <main className="grid grid-cols-2 gap-4 grid-flow-row auto-rows-min bg-black p-4 min-h-screen">
      {children}
    </main>
  );
}
