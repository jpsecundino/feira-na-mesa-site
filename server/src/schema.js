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
  ) on INPUT_FIELD_DEFINITION

  type Query {
    products: [Product]!
    product(id: ID!): Product
    weekProducts: [Product]
    users: [User]!
    user(cpf: String!): User
    producers: [Producer]!
    producer(cpf: String, cnpj: String): Producer
    producerByID(id: ID!): Producer
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

  input UserInput {
    cpf: String! @constraint(maxLength: 11)   # User identifier
    firstName: String! @constraint(pattern: "^[0-9a-zA-Z]*$", maxLength: 255)
    lastName: String! @constraint(pattern: "^[0-9a-zA-Z]*$", maxLength: 255)
    email: String! @constraint(format: "email", maxLength: 255)
    photo: String @constraint(maxLength: 255)
    deliveryAdresses: [AddressInput]!
    phoneNumber1: String! @constraint(maxLength: 64)
    phoneNumber2: String @constraint(maxLength: 64)
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

  input ProductInput {
    name: String! @constraint(maxLength: 255)
    unitOfMeasure: String! @constraint(maxLength: 255)
    price: Float! # Per unit of measure
    description: String
    photo: String! @constraint(maxLength: 512)
    producerIDs: [ID]!
    thisWeek: Boolean
  }

  type Producer {
    id: ID!
    cpf: String # Another identifier
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

  input ProducerInput {
    cpf: String @constraint(maxLength: 11)   # Another identifier
    cnpj: String @constraint(maxLength: 14)   # Just in case he/she has one
    firstName: String! @constraint(maxLength: 255)
    lastName: String! @constraint(maxLength: 255)
    email: String @constraint(format: "email", maxLength: 255)
    photo: String @constraint(maxLength: 255)
    history: String 
    adressesIDs: [ID]
    phoneNumber1: String! @constraint(maxLength: 64)
    phoneNumber2: String @constraint(maxLength: 64)
    productsIDs: [ID]
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

  input AddressInput {
    street: String! @constraint(maxLength: 255)
    district: String! @constraint(maxLength: 255)
    houseNumber: String! @constraint(maxLength: 5)
    complement: String! @constraint(maxLength: 255)
    cep: String! @constraint(maxLength: 8)
    city: String! @constraint(maxLength: 255)
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

  input OrderInput {
    owner: UserInput!   # Later on, this will be only a user ID (when login is implemented)
    lines: [OrderLineInput]!
    totalValue: Float! @constraint(min: 0)
    paymentMethod: String! @constraint(maxLength: 255)
    paid: Boolean!
    deliveryAdress: AddressInput!
    failed: Boolean!
  }

  type OrderLine {  # A number of baskets or products of the same type
    id: ID!
    isBasket: Boolean!
    productOrBasket: [Product]!
    quantity: Int!
    value: Float!
  }

  input OrderLineInput {
    isBasket: Boolean!
    productsID: [ID]!
    quantity: Int! @constraint(min: 1)
    value: Float! @constraint(min: 0)
  }
`;

module.exports = typeDefs;