const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    products: [Product]!
    product(id: ID!): Product
    weekProducts: [Product]
    user(id: ID!): User
  }

  type Mutation {
    addProduct(
      name: String!,
      price: Float!,
      photo: String,
      description: String,
      thisWeek: Boolean
    ): ProductUpdateResponse!
    removeProduct(id: ID!): ProductUpdateResponse!
    addToWeekProducts(id: ID!): ProductUpdateResponse!
    removeFromWeekProducts(id: ID!): ProductUpdateResponse!
  }

  type ProductUpdateResponse {
    success: Boolean!
    message: String
    products: [Product] # It's good practice for a mutation to return whatever objects it modifies so the requesting client can update its cache and UI without needing to make a followup query.
  }

  type User {
    id: ID!
    name: String!
    phone: String
    adress: String
    email: String!
    cart: Cart
  }

  type Product {
    id: ID!
    name: String!
    price: Float
    photo: String!
    description: String
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
    value: Float
  }

  enum BasketSize {
    SMALL
    MEDIUM
    LARGE
  }
`;

module.exports = typeDefs;