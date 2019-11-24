import gql from 'graphql-tag';

const POSTS_QUERY = gql`
  query Posts {
    sneakycrow_blog {
      body
      id
      posted_on
      title
    }
  }
`;

export default POSTS_QUERY;
