const { buildSchema } = require("graphql");

const Queries = `
  type Query {
    location(id: String!): Location
    locations: [Location]
    uploads: [File]
  }
`;

const Mutations = `
  type Mutation {
    updateLocation(
      id: String!,
      description: String
    ): Location
    addLocation(
      name: String,
      description: String,
      coords: CoordsInput,
      files: [Upload]
    ): Location
    removeLocation(
      id: String!
    ): Location
    singleUpload(file: Upload!): File!
    multipleUpload(files: [Upload!]): Location
}
`;

const Types = `
  scalar Upload
  type Location {
    id: String!
    name: String
    description: String
    coords: Coordinates
    images: [String]
  }
  type Coordinates {
    lat: Float
    lng: Float
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

const Inputs = `
  input UploadInput {
    name: String!
    type: String!
    size: Int!
    path: String!
  }
  input CoordsInput {
    lat: Float
    lng: Float
  }
  input ImgFileInput {
    name: String
    size: Int
    type: String
  }
`;

const schema = buildSchema(`
  ${Queries}
  ${Mutations}
  ${Types}
  ${Inputs}
`);

module.exports = schema;
