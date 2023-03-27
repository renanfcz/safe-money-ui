import { createApolloClient } from "@/lib/apollo-client";
import { IS_VALID_TOKEN } from "@/queries/auth.queries";

export async function isValidToken(token: string) {
  const apollo = createApolloClient(token);

  const result = await apollo.query({ query: IS_VALID_TOKEN });

  if(result.error) {
    return false;
  } else {
    return true;
  }
  // .then((result) => {
  //   return true;
  // })
  // .catch((error) => {
  //   return false;
  // });
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
