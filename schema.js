const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

// const customers = [
//     {id: '1', name: 'promise', email: 'promise@gmail.com', age: 12},
//     {id: '2', name: 'favour', email: 'favour@gmail.com', age: 15},
//     {id: '3', name: 'bobby', email: 'bobby@gmail.com', age: 11},
// ]


// customer type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: ()=>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

    customer: {
        type: CustomerType,
        args: {
            id: {type: GraphQLString}
        },
        resolve(parentValue, args){
            // for(let i=0; i < customers.length; i++){
            //     if(customers[i].id == args.id){
            //         return customers[i]
            //     }
            // }
            return axios.get('http://localhost:3000/customers/' + args.id)
            .then(res=> res.data)
        }
    },
    customers: {
        type: new GraphQLList(CustomerType),
        resolve(parentValue, args){
            return axios.get('http://localhost:3000/customers')
            .then(res=> res.data)
        }
    }
   }
})

// mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age,
                }).then(res=> res.data)
            }
        },
        deleteCustomer: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/customers/' + args.id).then(res=> res.data)
            }
        },
        editCustomer: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLString},
                name: {type: GraphQLString},
                age: {type: GraphQLString},
            },
            resolve(parentValue, args){
                return axios.put('http://localhost:3000/customers/' + args.id, args).then(res=> res.data)
            }
        },
    }
})

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation
})