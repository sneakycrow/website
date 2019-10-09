import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import Nav from '../components/nav';
const Footer = dynamic(() => import('../components/footer'), { ssr: false });
import CodeBlock from '../components/codeBlock';

const StyledPost = styled.div`
  max-width: ${props => props.theme.layout.contentMaxWidth};
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding: 0 16px;
  p {
    font-size: 1.7em;
    line-height: 1.4em;
    margin-bottom: 0.8em;
  }
  code {
    background-color: ${props => props.theme.palette.lightGray};
    border-radius: 2px;
    padding-left: 4px;
    padding-right: 4px;
    font-size: 0.9em;
    font-style: italic;
  }
  blockquote {
    color: ${props => props.theme.palette.gray};
    font-style: italic;
    position: relative;
    margin: 0.8em 0;
    padding: 2em;
    display: flex;
    align-items: center;
    > * {
      margin: 0;
    }
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 60%;
      background-color: ${props => props.theme.palette.gray};
      position: absolute;
      left: 0;
    }
  }
`;

const StyledStickyNav = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  pointer-events: none;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    max-width: ${props => props.theme.layout.contentMaxWidth};
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const StyledBackButton = styled.button`
  color: ${props => props.theme.palette.black};
  pointer-events: all;
  text-decoration: none;
  transition: color 0.25s ease-in-out;
  border: none;
  border-radius: 2px;
  display: inline-block;
  font-weight: bold;
  align-self: flex-start;
  display: flex;
  align-items: center;
  font-size: 1em;
  background-color: ${props => props.theme.palette.white};
  margin: 8px;
  padding: 8px 16px;
  transition: border 0.25s ease-in-out;
  pointer-events: all;
  &:hover {
    color: ${props => props.theme.palette.green};
    cursor: pointer;
  }
  &::before {
    content: '\\2190 Back';
  }
  @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
    border-radius: 50%;
    background-color: ${props => props.theme.layout.black};
    width: 50px;
    height: 50px;
    &::before {
      content: '\\2190';
      line-height: 1.5em;
    }
  }
`;

const Post = ({ post }) => {
  return (
    <Fragment>
      <Nav />
      <StyledPost className="markdown-body">
        <h1>{post.title}</h1>
        <ReactMarkdown source={post.body} renderers={{ code: CodeBlock }} />
      </StyledPost>
      <Footer />
      <StyledStickyNav>
        <div>
          <StyledBackButton onClick={() => Router.back()} />
        </div>
      </StyledStickyNav>
    </Fragment>
  );
};

Post.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://cors-anywhere.herokuapp.com/https://write.as/api/collections/sneakycrow/posts/${query.slug}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://sneakycrow.dev'
      }
    }
  );
  const data = await res.json();

  return {
    post: data.data
  };
};

export default Post;
