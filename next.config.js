require('dotenv').config()
exports.default = {
  env: {
    GRAPHQL_API: process.env.graphql_api,
    GRAPHQL_KEY: process.env.graphql_key
  }
}