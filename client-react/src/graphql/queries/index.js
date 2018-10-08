import gql from 'graphql-tag';

export const locations = gql`
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

export const location = gql`
  query Course($id: Int!) {
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
