const { ApolloServer } = require('apollo-server')
const dotenv = require('dotenv')

// import
const typeDefs = require('./schema/typeDefinition')
const resolvers = require('./schema/resolvers')
const dbConnection = require('./utils/dbConnection')
const User = require('./model/User')
const TaskList = require('./model/TaskList')
const { getUserFromToken } = require('./utils/jwt')

// initial
dotenv.config()
dbConnection()

// mongodb
let db = {
    User,
    TaskList,
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({
        req: {
            headers: { authorization },
        },
    }) => {
        return {
            db,
            authUser: await getUserFromToken(authorization, db.User),
        }
    },
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
