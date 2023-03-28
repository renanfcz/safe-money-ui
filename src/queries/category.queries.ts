import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query FindAllCategories {
    findAllCategories {
      id
      title
    }
  }
`;
