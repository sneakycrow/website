import { GraphQLClient } from 'graphql-request';

const withData = (query, variables) => {
  const endpoint = 'https://api.sneakycrow.dev/v1/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'x-hasura-admin-secret': process.env.GRAPHQL_API_TOKEN,
    },
  });

  if (variables) {
    return graphQLClient.request(query, variables); 
  }

  return graphQLClient.request(query); 
}

export default withData;