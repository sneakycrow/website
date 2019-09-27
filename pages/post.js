import React from 'react';
import ReactMarkdown from 'react-markdown';

const Post = ({ post }) => {
  console.log(post);
  return (
    <ReactMarkdown source={post.body} />
  )
}

Post.getInitialProps = async ({ query }) => {
  const res = await fetch(`https://write.as/api/collections/sneakycrow/posts/${query.slug}`);
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    post: data.data
  };
}

export default Post;
