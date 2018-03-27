import app from "./App";

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log("Running a GraphQL API server at localhost:4000/graphql");
});
