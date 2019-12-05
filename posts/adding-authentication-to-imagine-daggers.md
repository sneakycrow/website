[imagine-daggers](https://github.com/sneakycrow/imagine-daggers) is a project I started earlier this year. The idea behind it is that Table Top RPG players can take their logs for each session and turn them into short stories. 

Initially when I started the project, I did it to learn Rust. But the project kind of blew up in itself, and I decided this month that I'm going to convert it from Rust to Node. The reason for that is because I'm newer to Rust, and also the web ecosystem in Rust still needs more maturity I feel.

Doing it in Node, a language I'm very familiar with, I can get it off the ground way quicker. Even though it is in Node, I'm still taking a route that is new to me so I can still learn: Utilizing Next.js Serverless Functions

For my second "thing" today (for `#30ThingsInDecember`) I started re-doing the Authentication for Imagine Daggers.

Initially, I had a Postgres Database that I was creating a REST API for in Rust. Recently, I've started leaning more into GraphQL, so I setup a GraphQL API, and configured the application to be able to utilize that. Now, I've started working on some really basic authentication using the Next.js API Functions.

These are still a work in progress, but if you want to track my progress, check out [this branch](https://github.com/sneakycrow/imagine-daggers/compare/master...feature/api)