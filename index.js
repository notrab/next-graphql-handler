import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { graphiqlHtml } from "./graphiql";

export const GraphQLHandler = ({ typeDefs, resolvers, ...options }) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return async (req, res) => {
    const { method } = req;

    if (method === "GET") {
      return res.status(200).send(graphiqlHtml({ path: "/api/graphql" }));
    }

    const { query, variables, operationName } = req.body;

    const context = {
      ...(options.context && (await options.context(req))),
      req,
      res,
    };

    const response = await graphql(
      schema,
      query,
      null,
      context,
      variables,
      operationName
    );

    res.status(200).json(response);
  };
};
