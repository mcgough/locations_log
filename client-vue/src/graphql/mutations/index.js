import gql from 'graphql-tag';

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

export const ADD_NEW_LOCATION = gql`
  mutation addNewLocation($name: String!, $description: String, $coords: CoordsInput) {
    addNewLocation(name: $name, description: $description, coords: $coords) {
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
