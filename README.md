# next-graphql-handler

WIP project to create a GraphQL API route that can be used to handle GraphQL queries and mutations.

## Quickstart

```js
import { GraphQLHandler } from "next-graphql-handler";

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    // hello: (_, __, { userId }) => `context passed: ${userId}`,
    hello: () => "world",
  },
};

export default GraphQLHandler({
  typeDefs,
  resolvers,
  // context: (req) => ({
  //   userId: req.headers.authorization,
  // }),
});
```

## Todos

- [] Allow object OR func for context
- [] Enable directives
- [] Add tests
