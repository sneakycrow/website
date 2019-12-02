import React, { Fragment } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import Nav from '../components/nav';
const Footer = dynamic(() => import('../components/footer'), { ssr: false });
import BlogPosts from '../components/blogPosts';

const StyledBlogPostsContainer = styled.section`
  max-width: ${props => props.theme.layout.contentMaxWidth};
  margin: 100px auto 0;
  width: 100%;
  position: relative;
  padding: 16px;
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
      <Head>
        <title>blog - Sneaky Crow</title>
      </Head>
      <Nav />
      <StyledBlogPostsContainer>
        <StyledHero>
          <h2>Blog</h2>
        </StyledHero>
        <BlogPosts limit={10} />
      </StyledBlogPostsContainer>
      <Footer />
    </Fragment>
  );
};

export default Blog;
