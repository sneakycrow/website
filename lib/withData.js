import { GraphQLClient } from 'graphql-request';

export const withData = query => {
  const endpoint = 'https://api.sneakycrow.dev/v1/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'x-hasura-admin-secret': process.env.GRAPHQL_API_TOKEN,
    },
  });

  return graphQLClient.request(query); 
}