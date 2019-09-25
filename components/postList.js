import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPostList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  li {
    display: block;
    padding: 8px 4px;
    border-radius: 2px;
    width: 100%;
    &:hover {
      background-color: ${props => props.theme.palette.lightGray};
      cursor: pointer;
    }
  }
`;

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
    <StyledPostList>
      {posts.map(post => <li key={post.slug}>{post.title}</li>)}
    </StyledPostList>
  )
}

PostList.propTypes = {
  isTitleOnly: PropTypes.bool
}

PostList.defaultProps = {
  isTitleOnly: false
}

export default PostList;
