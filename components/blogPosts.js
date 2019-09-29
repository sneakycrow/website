import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import moment from 'moment';

import Throbber from '../components/throbber';
import LinkedList from '../components/linkedList';

const StyledBlogPosts = styled.div`
  width: 100%;
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BlogPosts = ({ limit = 5 }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const blogPostsController = new AbortController();
    fetch('https://cors-anywhere.herokuapp.com/https://write.as/api/collections/sneakycrow/posts', {
      signal: blogPostsController.signal,
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://sneakycrow.dev'
      }
    })
      .then(res => res.json())
      .then(data => setPosts(data.data.posts))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    return () => {
      blogPostsController.abort();
    };
  }, []);
  return (
    <StyledBlogPosts>
      {isLoading ? (
        <Throbber />
      ) : (
        <LinkedList
          list={posts.map(post => ({
            url: `/post?slug=${post.slug}`,
            label: moment.utc(post.created).format('MMMM DD, YYYY'),
            text: post.title
          }))}
          limit={limit}
        />
      )}
    </StyledBlogPosts>
  );
};

export default BlogPosts;
