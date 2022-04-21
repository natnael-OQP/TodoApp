const { ApolloServer, gql } = require('apollo-server')
const dotenv = require('dotenv')
// import
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')
const dbConnection = require('./utils/dbConnection')

// initial
dotenv.config()
dbConnection()

const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
