import gql from "graphql-tag";

export const ADD_LOCATION = gql`
  mutation addLocation(
    $name: String!
    $description: String
    $coords: CoordsInput
    $files: [Upload]
  ) {
    addLocation(
      name: $name
      description: $description
      coords: $coords
      files: $files
    ) {
      id
      name
      description
      coords {
        lat
        lng
      }
      images
    }
  }
`;

export const REMOVE_LOCATION = gql`
  mutation removeLocation($id: String!) {
    removeLocation(id: $id) {
      id
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation updateLocation($id: String!, $description: String) {
    updateLocation(id: $id, description: $description) {
      id
      name
      description
      coords {
        lat
        lng
      }
    }
  }
`;

export const MULTIPLE_UPLOAD = gql`
  mutation multipleUpload($files: [Upload!]) {
    multipleUpload(files: $files) {
      images
    }
  }
`;
