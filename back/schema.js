const { gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        id: ID!
        name: String
        number: String
        adress: String
        email: String
        cart: Cart
    }

    type Product {
        id: ID!
        name: String!
        price: Float!
        photo: String! 
        thisWeek: Boolean!
    }

    type Basket {
        size: BasketSize!
        price: Float!
        products: [Product]!
    }

    type Cart {
        products: [Product]
        baskets: [Basket]
    }

    enum BasketSize {
        SMALL
        MEDIUM
        LARGE
    }
    
    type Query {
        getProducts(productsIDs: [ID]): [Product]
        getWeekProducts: [Product]
        getUser(userID: ID!): User
    }

    type Mutate {
        setWeekProducts(productsID: [ID]!): UpdateResponse
        addProducts(newProducts: [ID]!): UpdateResponse
        
    }

    type UpdateResponse {
        success: Boolean!
        message: String
    }

`;

module.exports = typeDefs;