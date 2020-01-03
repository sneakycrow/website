import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Throbber from '../components/throbber';
import LinkedList from '../components/linkedList';
import CardList from './cardList';

const BlogPosts = ({ limit = 10 }) => {
  const { data, loading } = useQuery(POSTS_QUERY);

  return (
    <StyledBlogPosts>
      {loading ? (
        <Throbber />
      ) : (
        <CardList
          list={data.sneakycrow_blog.map(post => ({
            url: `/post?slug=${post.slug}`,
            label: moment.utc(post.published_on).format('MMMM DD, YYYY'),
            text: post.title
          }))}
          limit={limit}
        />
      )}
    </StyledBlogPosts>
  );
};

const POSTS_QUERY = gql`
  query Posts {
    sneakycrow_blog(order_by: {published_on: desc}) {
      slug
      title
      published_on
    }
  }
`;

const StyledBlogPosts = styled.div`
  width: 100%;
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default BlogPosts;
