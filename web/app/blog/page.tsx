import React from "react";
import Header from "@/app/Header";

const getData = async (): Promise<BlogPost[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
};

type BlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const Blog = async () => {
  const data = await getData();

  return (
    <>
      <Header />
      <div></div>
    </>
  );
};

export default Blog;
