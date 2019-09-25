import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Blog = props => {
  console.log(props);
  return (
    <div>
      <h1>Testing</h1>
      <ul>
        {props.posts.map(post => (
          <li>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

Blog.getInitialProps = async () => {
  const res = await fetch('https://write.as/api/collections/sneakycrow/posts', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    posts: data.data.posts
  }
}

export default Blog;
