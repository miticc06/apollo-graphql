import { mongoose } from "mongoose"
import { User } from '../models'
import { UserInputError } from "apollo-server-express"
import Joi from "joi"
import { SignUp } from "../schemas"

export default {
    Query: {
        users: (root, args, context, info) => {
            return User.find({})
        },
        user: (root, args, context, info) => {
            if (!mongoose.Types.ObjectId.isValid(args.id)) { // Id ko hợp lệ
                throw new UserInputError("User id not valid")
            }
            return User.findById(args.id);
        }
    },
    Mutation: {
        signUp: async (root, args, context, info) => {
            await Joi.validate(args, SignUp, { abortEarly: false })
            return User.create(args);
        }
    }
}