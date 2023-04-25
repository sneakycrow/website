import React from "react";
import { openGraph } from "@/app/openGraph";

export const metadata = {
  title: "homemade games by sneakycrow",
  description: "games developed and published by sneakycrow",
  openGraph,
};

const GamesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid gap-4 grid-flow-row bg-black p-4 min-h-screen auto-rows-min">
      {children}
    </main>
  );
};

export default GamesLayout;
