import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, MONGO_USER, MONGO_PASSWORD, MONGO_DB } from './config'
import mongoose from 'mongoose'


(async () => {
  try {


    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${
      MONGO_PASSWORD
      }@cluster0-xzyc5.gcp.mongodb.net/${
      MONGO_DB
      }?retryWrites=true&w=majority`
    )


    const app = express()

    app.disable('x-powered-by')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD
    })

    server.applyMiddleware({ app }) // app is from an existing express app

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )

  } catch (error) {
    console.log(error);
  }
})()


