interface BlogPageProps {
  params: {
    slug: string[];
  };
}

const BlogPage = (props: BlogPageProps) => {
  return (
    <>
      <div className="col-span-2 bg-white p-4">
        <h1 className="text-3xl">This is the title of the article</h1>
      </div>
      <div className="bg-white p-4">
        <p>this could be metadata?</p>
      </div>
      <div className="bg-white p-4">
        <p>this could be navigation</p>
      </div>
      <article className="col-span-2 bg-white p-4 min-h-[60vh]">
        This is the article itself
      </article>
    </>
  );
};

export default BlogPage;
