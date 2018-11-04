import gql from 'graphql-tag';

export const ALL_LOCATIONS_QUERY = gql`
  {
    locations {
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

export const LOCATION_QUERY = gql`
  query Location($id: String) {
    location(id: $id) {
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
