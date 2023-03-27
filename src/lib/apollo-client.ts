import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient, from, HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";

export const apolloClient = createApolloClient(undefined);

export function getAccessToken(): string | undefined {
    return getCookie('token');
}

function getCookie(name: string): string | undefined {
  const cookie = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookie ? cookie.pop() : '';
}

export const setAccessToken = (token: string) => {
  setCookie('token', token, 1);
};

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function createApolloClient(accessToken:string | undefined) {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql', // URL da sua API GraphQL
  });
  const authLink = setContext((_, { headers }) => {
    let token;
    console.log(accessToken);
    if(accessToken != undefined){
      token = accessToken;
    } else {
      token = getAccessToken();
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors)
  //     graphQLErrors.forEach(({ message, locations, path }) =>
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //       )
  //     );
  //   if (networkError) console.log(`[Network error]: ${networkError}`);
  // });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}