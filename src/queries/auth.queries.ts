import { gql } from "@apollo/client";

export const IS_VALID_TOKEN = gql`
  query IsValidToken {
    isValidToken
  }
`;
