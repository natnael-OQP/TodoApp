const { gql } = require('apollo-server')

module.exports = gql`
    #User
    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String
    }
    #TaskList
    type TaskList {
        id: ID!
        createdAt: String!
        title: String!
        progress: Float!
        users: [User!]!
        todos: [Todo!]!
    }
    #Todo
    type Todo {
        id: ID!
        content: String!
        isCompleted: Boolean!
        taskList: TaskList!
    }

    #Query
    type Query {
        myTaskList: [TaskList!]!
    }
    #Mutation
    type Mutation {
        signUp(input: SignUpInput): AuthUser
    }
    #Auth
    type AuthUser {
        user: User!
        token: String!
    }
    #input
    input SignUpInput {
        name: String!
        email: String!
        password: String!
        avatar: String
    }
`
