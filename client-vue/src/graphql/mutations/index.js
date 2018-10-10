import gql from 'graphql-tag';

export const ADD_LOCATION = gql`
  mutation addLocation($name: String!, $description: String, $coords: CoordsInput) {
    addLocation(name: $name, description: $description, coords: $coords) {
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

export const REMOVE_LOCATION = gql`
  mutation removeLocation($id: Int!) {
    removeLocation(id: $id) {
      id
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation updateLocation($id: Int!, $description: String!) {
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
