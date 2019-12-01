sneaky-url, a URL Shortener service. This is a clone of services like bitly, or Google's URL Shortener.

It's built on [now](https://zeit.co) and uses [hasura](https://hasura.io/) GraphQL. Let's break it down on how I did it.

_This tutorial will not review setting up a Hasura instance, or your GraphQL-layered API. This tutorial assumes that you've already done that part and that your familiar with GraphQL._

## init

First thing we need to do is initialize our project. Luckily, our project is pretty bare bones, so we don't need to use a generator! Create a new directory called `url-shortener`

`mkdir url-shortener`

Change directories into our new one, and we're going to create a few files: `src/get-link.ts`, `src/create-link.ts`, and `now.json`

`cd url-shortener`
`mkdir src`
`touch now.json`
`touch src/get-link.ts`
`touch src/create-link.ts`

Next we're going to want to add our necessary packages. I like to use `yarn` for reasons.

`yarn add @now/node shortid graphql-request`

## configuring now

The first configuration we're going to want to do is setup now. I did this late in the project and I could've saved myself a bunch of time by having this first.

We're going to want to setup routes. The routes we're going to use is a POST route for creating new shortened links, and a GET route for getting the link for redirection

Setup your `now.json` to look like this:

```json
{
  "routes": [
    {
      "src": "/(.*)",
      "methods": ["POST"],
      "dest": "/api/create-link.ts"
    },
    {
      "src": "/(.*)",
      "methods": ["GET"],
      "dest": "/api/get-link.ts"
    }
  ]
}
```

This is going to tell now that when someone does a POST request, to use our create-link file, and when someone does a GET request, to use our get-link file

## coding create-link.ts

For this part, we want the ability to create a link. I start with creating links first, because then once I'm done I'll have data to manipulate when we start the get-link logic.

First we want to bring in our dependencies

```ts
import { NowRequest, NowResponse } from '@now/node';
import shortid from 'shortid';
import { GraphQLClient } from 'graphql-request';
```

Next we want to create our mutation for updating our DB. My data structure has an ID and a target URL.

```ts
const newLinkMutation = `
mutation newLinkMutation($id: String, $urlTarget: String) {
  insert_sneaky_url(objects: {id: $id, target_url: $urlTarget}) {
    affected_rows
    returning {
      id
    }
  }
}
`;
```

And lastly, but not least, we want to create our handler function. This handler function is going to accept a new url in the request body, and then generate an ID for that to store in our DB. In my DB I added a unique enforcement on the ID, but you'd have to create quite a few ID's to start running into issues.

You can also configure a base URL in your environment, or here, whichever works for you. It honestly makes more sense in your environment.

```ts
const handler = (req: NowRequest, res: NowResponse) => {
    if (req.body) {
      const { urlTarget } = req.body;
      const id = shortid.generate();
      if (urlTarget && id) {
        const variables = {
          id,
          urlTarget
        };

        const graphQLClient = new GraphQLClient(process.env.graphql_endpoint);

        return graphQLClient.request(newLinkMutation, variables).then(data => {
          const { affected_rows, returning } = data.insert_sneaky_url;
          const baseURL = 'https://sneakycrow.dev';
          if (affected_rows > 0) {
            return res
              .status(200)
              .json({ status: 'success', newUrl: `${baseURL}/${returning[0].id}` });
          }
          return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        });
      }
    }
    return res.status(400).json({ error: 'This endpoint requires a url target' });
};

module.exports = handler;
```

And that's it! We created our function for returning our new URL. You can use `now dev` to test this. I'll leave it up to you to try and figure out how to test it with a new URL based on the code above ^.

## configuring get-link.ts

For this file, we're just going to query our DB based on the ID given, and return a 301 redirect with the target URL.

First, let's bring in our dependencies

```ts
import { NowRequest, NowResponse } from '@now/node';
import { GraphQLClient } from 'graphql-request';
```

Next, lets create our query. This will return our target URL based on our ID variable.

```ts
const getLinkQuery = `
query getLink($id: String) {
  sneaky_url(where: {id: {_eq: $id}}) {
    target_url
  }
}
`;
```

And lastly, let's create our handler function. This will accept a Request and Response. It's going to grab the id based on the path in the request URL. Then it will query our DB and create a 301 redirect with our target link

```ts
const handler = (req: NowRequest, res: NowResponse) => {
  const linkID = req.url.split('/')[1]; // This should be the ID
  const queryVariables = {
    id: linkID
  };

  const graphQLClient = new GraphQLClient(process.env.graphql_endpoint);
  if (linkID !== undefined) {
    graphQLClient.request(getLinkQuery, queryVariables).then(data => {
      const { target_url } = data.sneaky_url[0];
      if (target_url) {
        res.writeHead(301, { Location: target_url });
        return res.end();
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
  return res.status(400).json({ error: 'Requires an ID for the link' });
};

module.exports = handler;
```

And that's all there is to it! I wrote this tutorial very quickly, if you have any issues at all feel free to email me [zach@sneakycrow.dev](mailto:zach@sneakycrow.dev).
