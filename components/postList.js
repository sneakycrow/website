import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';

const PostList = ({ isTitleOnly }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
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
  
    setPosts(data.data.posts);
  }, []);

  return (
    <ul>
      {posts.map(post => <li key={post.slug}>{post.title}</li>)}
    </ul>
  )
}

PostList.propTypes = {
  isTitleOnly: PropTypes.bool
}

PostList.defaultProps = {
  isTitleOnly: false
}

export default PostList;
