const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const db = {
  users: [
    {
      id: "1",
      email: "em1@gmail.com",
      name: "name1",
      avatarUrl: "http://djasldjlasd.com/dasd"
    },
    {
      id: "2",
      email: "em2@gmail.com",
      name: "name2",
      avatarUrl: "http://djasldjlasd.com/dasd"
    }
  ]
};
const schema = buildSchema(`
      type Query {
          users: [User!]!
      }
      type User {
          id: ID!
          email: String!
          name: String
          avatarUrl: String
      }
  `);

const rootValue = {
  users: () => db.users
};

app.listen(3000, () => {
  console.log("listening on port 3000");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

// graphql(
//   schema,
//   `
//     {
//       users {
//         id
//         email
//       }
//     }
//   `,
//   rootValue
// ).then(res => {
//   console.dir(res, { depth: null });
// });
