import {
    ApolloClient,
    InMemoryCache,
    HttpLink
  } from "@apollo/client";
  
  console.log(process.env.NEXT_PUBLIC_GITHUB_BASE_URL);
  
  const httpLink = new HttpLink({
    uri    : process.env.NEXT_PUBLIC_GITHUB_BASE_URL,
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN}`
    } 
  })
  
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  })
  
  export default client;
  