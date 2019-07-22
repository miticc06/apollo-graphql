import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { User } from './models'
import {
  APP_PORT, IN_PROD, MONGO_USER, MONGO_PASSWORD, MONGO_DB,
  SESS_NAME,
  SESS_LIFETIME,
  SESS_SECRECT,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS
} from './config'
import mongoose from 'mongoose'
import session from "express-session"
import connectRedis from "connect-redis"

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


    const RedisStore = connectRedis(session)
    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASS
    })

    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRECT,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
      }
    }))


    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cors: false,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app }) // app is from an existing express app

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )

  } catch (error) {
    console.log(error);
  }
})()


