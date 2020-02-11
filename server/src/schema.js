const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    products: [Product]!
    product(id: ID!): Product
    weekProducts: [Product]
    user(cpf: String!): User
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

  interface MutationResponse {
    code: String! # HTTP Status Code
    success: Boolean!
    message: String!
  }

  type ProductUpdateResponse implements MutationResponse {
    code: String! # HTTP Status Code
    success: Boolean!
    message: String!
    products: [Product] # It's good practice for a mutation to return whatever objects it modifies so the requesting client can update its cache and UI without needing to make a followup query.
  }

  type User {
    cpf: String!  # User identifier
    firstName: String!
    lastName: String!
    email: String!
    photo: String
    deliveryAdresses: [Address]!
    phoneNumber1: String!
    phoneNumber2: String
    orders: [Order]
    totalSpent: Float
  }

  type Product {
    id: ID!
    name: String!
    unitOfMeasure: String!
    price: Float! # Per unit of measure
    description: String
    photo: String!
    producer: [Producer]!
    thisWeek: Boolean!
  }

  type Producer {
    id: ID!
    cpf: String  # Another identifier
    cnpj: String # Just in case he/she has one
    firstName: String!
    lastName: String!
    email: String
    photo: String
    history: String
    adresses: [Address]!
    phoneNumber1: String!
    phoneNumber2: String
    products: [Product]
    # salesMade: [Order] # Does this even make sense?
  }

  type Address {
    id: ID!
    street: String!
    district: String!
    houseNumber: String!
    complement: String!
    cep: String!
    city: String!
    resident: User!
    description: String
  }

  type Order {
    id: ID!
    owner: User!
    lines: [OrderLine]!
    totalValue: Float!
    paymentMethod: String!
    paid: Boolean!
    deliveryAdress: Address!
    failed: Boolean!
  }

  type OrderLine {  # A number of baskets or products of the same type
    id: ID!
    isBasket: Boolean!
    productOrBasket: [Product]!
    quantity: Int!
    value: Float!
  }
`;

module.exports = typeDefs;