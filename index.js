const { graphql } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { graphiqlHtml } = require("./graphiql");

exports.GraphQLHandler = ({ typeDefs, resolvers, ...options }) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return async (req, res) => {
    const { method } = req;

    if (method !== "GET" && method !== "POST") {
      return res
        .status(405)
        .setHeader("Allow", "GET, POST")
        .json({ message: "You can only GET or POST to GraphQL" });
    }

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
