import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Throbber from './throbber';
import LinkedList from './linkedList';
import CardList from './cardList';

interface IBlogPost {
  title: string;
  published_on: string;
  slug: string;
  header_image_url: string;
  header_image_alt: string;
}
interface IBlogPostProps {
  limit: number;
  isCardStyle: boolean;
}

const BlogPosts = (props: IBlogPostProps) => {
  const { data, loading } = useQuery(POSTS_QUERY);
  const { limit, isCardStyle = false } = props;
  return (
    <StyledBlogPosts>
      {loading ? (
        <Throbber />
      ) : isCardStyle ? (
        <CardList
          list={data.sneakycrow_blog.map((post: IBlogPost) => ({
            url: `/post?slug=${post.slug}`,
            label: moment.utc(post.published_on).format('MMMM DD, YYYY'),
            text: post.title,
            imageURL: post.header_image_url,
            imageALT: post.header_image_alt
          }))}
          limit={limit}
        />
      ) : (
        <LinkedList
          list={data.sneakycrow_blog.map((post: IBlogPost) => ({
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
    sneakycrow_blog(order_by: { published_on: desc }) {
      slug
      title
      published_on
      header_image_url
      header_image_alt
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
