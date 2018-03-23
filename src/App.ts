import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import * as  graphql from "graphql";

// Maps id to User object
const fakeDatabase = {
  a: {
    id: "a",
    name: "alice",
  },
  b: {
    id: "b",
    name: "bob",
  },
  c: {
    id: "c",
    name: "cab",
  },
};

// Define the User type
const userType = new graphql.GraphQLObjectType({
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  },
  name: "User",
});

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  fields: {
    user: {
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: (_, {id}) => {
        return fakeDatabase[id];
      },
      type: userType,
    },
  },
  name: "Query",
});

const schema = new graphql.GraphQLSchema({query: queryType});

class App {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const crouter = express.Router();
    this.express.use("/graphql", graphqlHTTP({
      graphiql: true,
      schema,
    }));
  }
}

export default new App().express;
