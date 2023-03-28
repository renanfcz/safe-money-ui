import { gql } from 'graphql-request';

export const LOGIN_USER = gql`
  mutation Login($authInput: AuthInput!) {
    login(authInput: $authInput) {
      token
    }
  }
`;

export const IS_VALID_TOKEN = gql`
  query IsValidToken {
    isValidToken
  }
`;
