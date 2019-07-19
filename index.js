const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const crypto = require("crypto");

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
  ],
  messages: [
    {
      id: "1",
      userId: "1",
      body: "hello",
      createdAt: Date.now()
    },
    {
      id: "2",
      userId: "2",
      body: "Hi",
      createdAt: Date.now()
    },
    {
      id: "3",
      userId: "1",
      body: "what is up?",
      createdAt: Date.now()
    }
  ]
};

class User {
  constructor(user) {
    Object.assign(this, user);
  }
  messages() {
    return db.messages.filter(message => message.userId === this.id);
  }
}

const schema = buildSchema(`
      type Query {
          users: [User!]!
          user(id: ID!): User
          messages: [Message!]!
      }

      type Mutation {
        addUser(email: String!, name: String): User
      }

      type User {
          id: ID!
          email: String!
          name: String
          avatarUrl: String
          messages: [Message!]!
      }

      type Message {
          id: ID!,
          body: String!,
          createdAt: String
      }

  `);

const rootValue = {
  users: () => db.users.map(user => new User(user)),
  user: args => {
    return db.users.find(user => user.id === args.id);
  },
  addUser: ({ email, name }) => {
    const user = {
      id: crypto.randomBytes(10).toString("hex"),
      email,
      name
    };

    db.users.push(user);
    return user;
  },
  get messages() {
    return db.messages;
  }
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
