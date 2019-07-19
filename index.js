const { ApolloServer, gql } = require("apollo-server");
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

const typeDefs = gql`
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
    id: ID!
    body: String!
    createdAt: String
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    user: (root, { id }) => db.users.find(user => user.id === id),
    get messages() {
      return db.messages;
    }
  },
  Mutation: {
    addUser: (root, { email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString("hex"),
        email,
        name
      };

      db.users.push(user);
      return user;
    }
  },
  User: {
    messages: user => db.messages.filter(message => message.userId === user.id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers }); //resolvers
server.listen().then(({ url }) => {
  console.log(url);
});
