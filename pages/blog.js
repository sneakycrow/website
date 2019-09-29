import React, { Fragment } from 'react';
import styled from 'styled-components';

import Nav from '../components/nav';
import BlogPosts from '../components/blogPosts';

const StyledBlogPostsContainer = styled.section`
  max-width: ${props => props.theme.layout.contentMaxWidth};
  margin: 100px auto 0;
  width: 100%;
  position: relative;
`;

const StyledHero = styled.div`
  display: flex;
  width: 100%;
  height: 25vh;
  align-items: center;
  justify-content: flex-start;
`;

const Blog = () => {
  return (
    <Fragment>
      <Nav />
      <StyledBlogPostsContainer>
        <StyledHero>
          <h2>Blog</h2>
        </StyledHero>
        <BlogPosts limit={10} />
      </StyledBlogPostsContainer>
    </Fragment>
  );
};

export default Blog;
