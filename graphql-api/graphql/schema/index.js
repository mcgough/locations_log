const { buildSchema } = require('graphql');

const Queries = `
  type Query {
    location(id: Int!): Location
    locations(id: Int): [Location]
  }
`;

const Mutations = `
  type Mutation {
    updateLocation(id: Int!, description: String!): Location
    addNewLocation(name: String, description: String, coords: CoordsInput): Location
}
`;

const Types = `
  type Location {
    id: Int
    name: String
    description: String
    coords: Coordinates
  }
  type Coordinates {
    lat: Float
    lng: Float
  }
`;

const Inputs = `
  input CoordsInput {
    lat: Float
    lng: Float
  }
`;

const schema = buildSchema(`
  ${Queries}
  ${Mutations}
  ${Types}
  ${Inputs}
`);

module.exports = schema;