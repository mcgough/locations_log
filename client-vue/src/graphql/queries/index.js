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
    }
  }
`;

export const LOCATION_QUERY = gql`
  query Location($id: Int!) {
    location(id: $id) {
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
