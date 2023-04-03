import { createApolloClient } from "@/lib/apollo-client";
import { IS_VALID_TOKEN } from "@/queries/auth.queries";
import { GraphQLClient } from "graphql-request";

export async function isValidToken(token: string) {
  const apollo = createApolloClient(token);

  const result = await apollo.query({ query: IS_VALID_TOKEN });

  if (result.error) {
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const token =
    typeof window !== "undefined"
      ? document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        )
      : "";
  return token;
}

export async function executeMutation(
  query: string,
  variables: any,
  token: string
): Promise<any> {
  const URI = process.env.GRAPHQL_API;

  const graphqlClient = new GraphQLClient(!!URI ? URI : "", {
    headers: {
      Authorization: `${!!token ? "Bearer " + token : ""}`,
    },
  });

  return await graphqlClient.request(query, variables);
}

export async function executeQuery(query: string, variables: any, token: string): Promise<any> {
  const URI = process.env.GRAPHQL_API;

  const graphqlClient = new GraphQLClient(!!URI ? URI : "", {
    headers: {
      Authorization: `${!!token ? "Bearer " + token : ""}`,
    },
  });

  return await graphqlClient.request(query, variables);
}
