import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import moment from 'moment';
import fetch from 'isomorphic-unfetch';

import Nav from '../components/nav';
import LinkedList from '../components/linkedList';
import ChangingText from '../components/changingText';

const StyledHero = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  max-width: ${props => props.theme.layout.contentMaxWidth};
  margin: auto;
  h1 {
    margin: 0;
  }
  @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
    padding: 8px;
    height: calc(100vh - 100px);
    margin-top: 100px;
  }
`;

const StyledSection = styled.section`
  max-width: ${props => props.theme.layout.contentMaxWidth};
  margin: auto;
  margin-bottom: 64px;
  min-height: 60vh;
`;

const StyledFooter = styled.footer`
  margin-top: 25vh;
  border-top: 1px solid ${props => props.theme.palette.lightGray};
  padding: 24px;
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
  const [posts, setPosts] = useState([]);

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
      .then(data => setPosts(data.data.posts));

    return () => {
      blogPostsController.abort();
    };
  }, []);

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
              'Guitar Beginner',
              'Gamer',
              'Hiker',
              'Illustrator'
            ]}
          />
        </h3>
      </StyledHero>
      <StyledSection>
        <h2>Thoughts</h2>
        <LinkedList
          list={posts.slice(0, 10).map(post => ({
            url: `https://write.as/sneakycrow/${post.slug}`,
            label: moment.utc(post.created).format('MMMM DD, YYYY'),
            text: post.title
          }))}
        />
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
