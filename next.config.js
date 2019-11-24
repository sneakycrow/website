require('dotenv').config()
exports.default = {
  env: {
    graphql_api: process.env.graphql_api,
    graphql_key: process.env.graphql_key
  }
}