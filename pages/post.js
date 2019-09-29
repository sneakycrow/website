import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

import Nav from '../components/nav';
import CodeBlock from '../components/codeBlock';

const StyledPost = styled.div`
  width: ${props => props.theme.layout.contentMaxWidth};
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`

const Post = ({ post }) => {
  return (
    <Fragment>
      <Nav />
      <StyledPost>
        <h1>{post.title}</h1>
        <ReactMarkdown
          source={post.body}
          renderers={{ code: CodeBlock }}
        />
      </StyledPost>
    </Fragment>
  )
}

Post.getInitialProps = async ({ query }) => {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/https://write.as/api/collections/sneakycrow/posts/${query.slug}`);
  const data = await res.json();

  return {
    post: data.data
  };
}

export default Post;
