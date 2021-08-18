import { GraphQLHandler } from "../../next-graphql-handler";

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
