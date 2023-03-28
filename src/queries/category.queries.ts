import { gql } from 'graphql-request';

export const CATEGORIES = gql`
  query FindAllCategories {
    findAllCategories {
      id
      title
    }
  }
`;
