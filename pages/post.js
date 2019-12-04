import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import styled, { keyframes } from 'styled-components';
import gql from 'graphql-tag';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';

import Nav from '../components/nav';
const Footer = dynamic(() => import('../components/footer'), { ssr: false });
import CodeBlock from '../components/codeBlock';
import Throbber from '../components/throbber';

const Post = ({ slug }) => {
  const { data, loading: isLoading } = useQuery(POST_QUERY, { variables: { slug } });
  const [likePost, { called: likeCalled }] = useMutation(LIKE_POST_MUTATION, {
    refetchQueries: [
      {
        query: POST_QUERY,
        variables: {
          slug
        }
      }
    ]
  });

  const likePostHandler = () => {
    if (!likeCalled) {
      likePost({
        variables: {
          postID: data.sneakycrow_blog[0].id,
          newLikes: data.sneakycrow_blog[0].likes + 1
        }
      });
    }
  };
  return (
    <Fragment>
      <Nav />
      {isLoading ? (
        <Fragment>
          <Head>
            <title>Loading Post - Sneaky Crow blog</title>
          </Head>
          <Throbber />
        </Fragment>
      ) : (
        <Fragment>
          <Head>
            <title>{data.sneakycrow_blog[0].title} - Sneaky Crow blog</title>
          </Head>
          <StyledPost className="markdown-body">
            <h1>{data.sneakycrow_blog[0].title}</h1>
            <h5>
              Posted on{' '}
              <strong>
                {moment.utc(data.sneakycrow_blog[0].published_on).format('MMMM DD, YYYY')}
              </strong>
            </h5>
            <ReactMarkdown source={data.sneakycrow_blog[0].body} renderers={{ code: CodeBlock }} />
            <hr />
            {data.sneakycrow_blog[0].published_on !== data.sneakycrow_blog[0].updated_on && (
              <h5 style={{ marginTop: '2em' }}>
                Updated on{' '}
                <strong>
                  {moment.utc(data.sneakycrow_blog[0].updated_on).format('MMMM DD, YYYY')}
                </strong>
              </h5>
            )}
            <StyledLikes onClick={likePostHandler} isPostLiked={likeCalled}>
              <img src="/static/heart_svg.svg" />
              Like
            </StyledLikes>
          </StyledPost>
        </Fragment>
      )}
      <Footer />
      <StyledStickyNav>
        <div>
          <StyledBackButton onClick={() => Router.back()} />
        </div>
      </StyledStickyNav>
    </Fragment>
  );
};

Post.getInitialProps = ({ query }) => {
  return {
    slug: query.slug
  };
};

const StyledPost = styled.div`
  max-width: ${props => props.theme.layout.contentMaxWidth};
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding: 0 16px;
  h1 {
    margin-bottom: 0;
  }
  h5 {
    font-weight: normal;
    margin-bottom: 2em;
  }
  p {
    font-size: 1.7em;
    line-height: 1.4em;
    margin-bottom: 0.8em;
  }
  ul {
    list-style: unset;
    padding-left: 1.7em;
    margin-bottom: 1em;
  }
  li {
    font-size: 1.7em;
    margin-bottom: 0.5rem;
  }
  li::marker {
    color: ${props => props.theme.palette.green};
  }
  code {
    background-color: ${props => props.theme.palette.lightGray};
    border-radius: 2px;
    padding-left: 4px;
    padding-right: 4px;
    font-size: 0.9em;
    font-style: italic;
    white-space: nowrap;
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
  hr {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.palette.lightGray};
    border: none;
    margin-bottom: 32px;
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

const jumpAnimation = keyframes`
  50% {
    transform: scale(2);
  }
  75% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledLikes = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${props => (props.isPostLiked ? props.theme.palette.red : props.theme.palette.lightGray)};
  font-size: 0.75em;
  color: ${props => props.theme.palette.black};
  border-radius: 2px;
  max-width: 100px;
  padding: 8px 16px;
  font-weight: bold;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  img {
    height: 1em;
    width: auto;
    margin-right: 8px;
    animation: ${props => (props.isPostLiked ? jumpAnimation : 'unset')} 0.25s linear;
  }
`;

const POST_QUERY = gql`
  query Posts($slug: String!) {
    sneakycrow_blog(where: { slug: { _eq: $slug } }) {
      body
      slug
      id
      published_on
      title
      updated_on
      likes
    }
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation UpdateLikesOnPost($postID: uuid!, $newLikes: Int!) {
    update_sneakycrow_blog(where: { id: { _eq: $postID } }, _set: { likes: $newLikes }) {
      returning {
        likes
      }
    }
  }
`;

export default Post;
