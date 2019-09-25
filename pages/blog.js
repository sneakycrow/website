import React, { Fragment } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Nav from '../components/nav';

const Blog = props => {
  return (
    <Fragment>
      <Nav />
      <div>
        <h1>Testing</h1>
        <ul>
          {props.posts.map(post => (
            <li key={post.slug}>{post.title}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

Blog.getInitialProps = async () => {
  const res = await fetch(
    'https://cors-anywhere.herokuapp.com/https://write.as/api/collections/sneakycrow/posts',
    {
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://sneakycrow.dev'
      }
    }
  );

  const data = await res.json();

  return {
    posts: data.data.posts
  };
};

export default Blog;
