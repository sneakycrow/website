import React, { Fragment } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Nav from '../components/nav';
import BlogPosts from '../components/blogPosts';
import ChangingText from '../components/changingText';

const StyledHero = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  max-width: ${props => props.theme.layout.contentMaxWidth};
  margin: auto;
  padding: 16px;
  h1 {
    margin: 0;
  }
`;

const StyledSection = styled.section`
  max-width: ${props => props.theme.layout.contentMaxWidth};
  margin: auto;
  margin-bottom: 64px;
  min-height: 60vh;
  padding: 16px;
`;

const StyledFooter = styled.footer`
  margin-top: 25vh;
  border-top: 1px solid ${props => props.theme.palette.lightGray};
  padding: 24px;
  padding: 16px;
  > * {
    max-width: ${props => props.theme.layout.contentMaxWidth};
    margin: auto;
    width: 100%;
    display: block;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    li {
      &:not(:last-child) {
        &::after {
          content: '|';
          margin-left: 8px;
          margin-right: 8px;
        }
      }
    }
  }
`;

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Sneaky Crow</title>
      </Head>

      <Nav />

      <StyledHero>
        <h1>
          Hi, I'm <s>Zachary Sohovich</s> a.k.a{' '}
          <b>
            <ChangingText textVariants={['Sneaky Crow', 'Boophis', 'Artis', 'Gigax']} />
          </b>
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
      </StyledHero>
      <StyledSection>
        <h3>Thoughts</h3>
        <BlogPosts />
      </StyledSection>
      <StyledFooter>
        <ul>
          <li>
            <a href="mailto:zach@sneakycrow.dev">Email</a>
          </li>
          <li>
            <a href="https://write.as/sneakycrow/resume">Resume</a>
          </li>
        </ul>
      </StyledFooter>
    </Fragment>
  );
};

export default Home;
