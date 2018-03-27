import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import * as fs from "fs";
import * as  graphql from "graphql";
import * as mysql from "mysql";

import {
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
} from "./helpers/settings";

const connection = mysql.createConnection({
  database: "mlbstats",
  host: MYSQL_HOST,
  password: MYSQL_PASSWORD,
  ssl: {
    ca: fs.readFileSync("/etc/ssl/certs/rds-combined-ca-bundle.pem"),
  },
  user: MYSQL_USER,
});

connection.connect((err) => {
  if (err) {
    console.error("error connection: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Define the Player type
const playerType = new graphql.GraphQLObjectType({
  fields: {
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
  },
  name: "Player",
});

// Define the Query type
const queryType = new graphql.GraphQLObjectType({
  fields: {
    user: {
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLID },
      },
      resolve: (_, {id}) => {
        return new Promise((resolve, reject) => {
          connection.query("SELECT mlb_name FROM players WHERE id = ?", id, (error, results, fields) => {
             resolve({ id, name: results[0].mlb_name });
          });
        });
      },
      type: playerType,
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
