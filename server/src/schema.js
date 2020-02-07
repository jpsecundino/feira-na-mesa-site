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
    cpf: ID!
    firstName: String!
    lastName: String!
    email: String!
    adress: House!
    phoneNumber: String!
  }

  type Product {
    id: ID!
    name: String!
    weight: Float
    price: Float!
    producer: [Producer]!
    description: String
    thisWeek: Boolean!
    photo: String!
  }

  type Producer {
    cpf: ID!
    firstName: String!
    lastName: String!
    email: String
    adress: String
    phoneNumber1: String!
    phoneNumber2: String
    products: [Product]
  }

  type Order {
    id: ID!
    byUser: User!
    totalValue: Float!
    hasBasket: Boolean!
    basketType: String
    paymentMethod: String!
    paymentState: Boolean!
    deliveryAdress: House!
  }

  type House {
    id: ID!
    adress: String!
    houseNumber: Integer!
    city: String!
    district: String!
    complement: String!
    cep: Integer!
    resident: User!
  }

  type OrderLine {
    id: ID!
    associatedOrder: Order!
    associatedProduct: Product!
    productQty: Float!
    totalValue: Float!
  }
`;

module.exports = typeDefs;