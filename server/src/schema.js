const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar ConstraintString
  scalar ConstraintNumber
  
  directive @constraint(
    # String constraints
    minLength: Int
    maxLength: Int
    startsWith: String
    endsWith: String
    notContains: String
    pattern: String
    format: String

    # Number constraints
    min: Int
    max: Int
    exclusiveMin: Int
    exclusiveMax: Int
    multipleOf: Int
  ) on FIELD_DEFINITION

  type Query {
    products: [Product]!
    product(id: ID!): Product
    weekProducts: [Product]
    users: [User]!
    user(cpf: String!): User
    producers: [Producer]!
    producer(cpf: String, cnpj: String): Producer
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
    cpf: String! @constraint(maxLength: 11)   # User identifier
    firstName: String! @constraint(pattern: "^[0-9a-zA-Z]*$", maxLength: 255)
    lastName: String! @constraint(pattern: "^[0-9a-zA-Z]*$", maxLength: 255)
    email: String! @constraint(format: "email", maxLength: 255)
    photo: String @constraint(maxLength: 255)
    deliveryAdresses: [Address]! 
    phoneNumber1: String! @constraint(maxLength: 64)
    phoneNumber2: String @constraint(maxLength: 64)
    orders: [Order]
    totalSpent: Float @constraint(min: 0)
  }

  type Product {
    id: ID!
    name: String! @constraint(maxLength: 255)
    unitOfMeasure: String! @constraint(maxLength: 255)
    price: Float! # Per unit of measure
    description: String
    photo: String! @constraint(maxLength: 512)
    producer: [Producer]!
    thisWeek: Boolean!
  }

  type Producer {
    id: ID!
    cpf: String @constraint(maxLength: 11)   # Another identifier
    cnpj: String @constraint(maxLength: 14)   # Just in case he/she has one
    firstName: String! @constraint(maxLength: 255)
    lastName: String! @constraint(maxLength: 255)
    email: String @constraint(format: "email", maxLength: 255)
    photo: String @constraint(maxLength: 255)
    history: String 
    adresses: [Address]!
    phoneNumber1: String! @constraint(maxLength: 64)
    phoneNumber2: String @constraint(maxLength: 64)
    products: [Product]
    # salesMade: [Order] # Does this even make sense?
  }

  type Address {
    id: ID!
    street: String! @constraint(maxLength: 255)
    district: String! @constraint(maxLength: 255)
    houseNumber: String! @constraint(maxLength: 5)
    complement: String! @constraint(maxLength: 255)
    cep: String! @constraint(maxLength: 8)
    city: String! @constraint(maxLength: 255)
    resident: User!
    description: String
  }

  type Order {
    id: ID!
    owner: User!
    lines: [OrderLine]!
    totalValue: Float! @constraint(min: 0)
    paymentMethod: String! @constraint(maxLength: 255)
    paid: Boolean!
    deliveryAdress: Address!
    failed: Boolean!
  }

  type OrderLine {  # A number of baskets or products of the same type
    id: ID!
    isBasket: Boolean!
    productOrBasket: [Product]!
    quantity: Int! @constraint(min: 1)
    value: Float! @constraint(min: 0)
  }
`;

module.exports = typeDefs;