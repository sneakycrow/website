import React from "react";
import { openGraph } from "@/_next_pages/openGraph";

export const metadata = {
  title: "award-winning blog by sneakycrow",
  description: "the thoughts of a mad scientist",
  openGraph
};

const BlogLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">{children}</main>
);

export default BlogLayout;
