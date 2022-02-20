const express = require('express')
var express_graphql = require('express-graphql').graphqlHTTP
const { buildSchema } = require('graphql')
const schema = require('./schema')

// const schema = buildSchema(`
//    type Query{
//        message: String
//    }
// `)

const root = {
    message: ()=> 'Hello world'
}

const app = express()

app.use('/graphql', express_graphql({
    schema: schema,
    // rootValue: root,
    graphiql: true
}))

app.listen(5000, ()=> console.log('Server is running on port 5000'))

