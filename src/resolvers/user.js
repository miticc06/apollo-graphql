import { mongoose } from "mongoose"
import { User } from '../models'
import { UserInputError } from "apollo-server-express"
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
        signUp: (root, args, context, info) => {



            return User.create(args);
        }
    }
}