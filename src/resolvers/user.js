import { mongoose } from "mongoose"
import { User } from '../models'
import { UserInputError } from "apollo-server-express"
import Joi from "joi"
import { signUp, signIn } from "../schemas"
import * as Auth from "../auth"

export default {
    Query: {
        me: (root, args, { req }, info) => {
            Auth.checkSignedIn(req);
            return User.findById(req.session.userId)
        },
        users: (root, args, { req }, info) => {
            Auth.checkSignedIn(req)
            return User.find({})
        },
        user: (root, args, { req }, info) => {
            Auth.checkSignedIn(req)
            if (!mongoose.Types.ObjectId.isValid(args.id)) { // Id ko hợp lệ
                throw new UserInputError("User id not valid")
            }
            return User.findById(args.id);
        }
    },
    Mutation: {
        signUp: async (root, args, { req }, info) => {
            Auth.checkSignedOut(req)
            await Joi.validate(args, signUp, { abortEarly: false })

            const user = await User.create(args);

            req.session.userId = user.id

            return user
        },
        signIn: async (root, args, { req }, info) => {
            const { userId } = req.session
            if (userId) {
                return User.findById(userId)
            }
            await Joi.validate(args, signIn, { abortEarly: false });
            //  const { email, password } = args
            const user = await Auth.attemptSignIn(args.email, args.password)

            req.session.userId = user.id

            return user

        },
        signOut: (root, args, { req, res }, info) => {
            Auth.checkSignedIn(req);
            return Auth.signOut(req, res);
        }
    }
}