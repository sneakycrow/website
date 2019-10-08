import React, { Fragment } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import dynamic from 'next/dynamic';


import Nav from '../components/nav';
const Footer = dynamic(() => import('../components/footer'), { ssr: false });
import Hero from '../components/hero';
import BlogPosts from '../components/blogPosts';
import ChangingText from '../components/changingText';

const StyledSection = styled.section`
  max-width: ${props => props.theme.layout.contentMaxWidth};
  margin: auto;
  height: 100vh;
  padding: 16px;
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.palette.lightGray};
    margin-bottom: 25vh;
  }
`;

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Sneaky Crow</title>
      </Head>

      <Nav />

      <Hero>
        <h1>
          Hi, I'm <s>Zachary Sohovich</s> a.k.a{' '}
          <strong>
            <ChangingText textVariants={['Sneaky Crow', 'Boophis', 'Artis', 'Gigax']} />
          </strong>
        </h1>
        <h3>
          <ChangingText
            textVariants={[
              'Senior Developer',
              'Dungeon Master',
              'Guitar Player',
              'Gamer',
              'Hiker',
              'Illustrator'
            ]}
          />
        </h3>
      </Hero>
      <StyledSection>
        <h3>Thoughts</h3>
        <BlogPosts />
      </StyledSection>
      <Footer />
    </Fragment>
  );
};

export default Home;
