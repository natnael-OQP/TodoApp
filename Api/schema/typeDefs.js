const { gql } = require('apollo-server')

module.exports = gql`
    #---------------------------------- Schema Definition ----------------------------------
    #User
    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String
    }
    #Todo
    type Todo {
        id: ID!
        content: String!
        isCompleted: Boolean!
        taskList: TaskList!
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
    #---------------------------------- inputs ----------------------------------
    input SignUpInput {
        name: String!
        email: String!
        password: String!
        avatar: String
    }
    input SignInInput {
        email: String!
        password: String!
    }
    #---------------------------------- Auth ----------------------------------
    type AuthUser {
        user: User!
        token: String!
    }
    #---------------------------------- Query ----------------------------------
    type Query {
        myTaskList: [TaskList!]!
    }
    #---------------------------------- Mutation ----------------------------------
    type Mutation {
        signUp(input: SignUpInput!): AuthUser!
        signIn(input: SignInInput!): AuthUser!
        createTaskList(title: String!): TaskList!
    }
`
