import mongoose from 'mongoose'
import { hash } from "bcryptjs"
import user from '../typeDefs/user';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: (email) => User.dontExist({ email }),
            message: ({ value }) => `Email ${value} has already been taken.`
        }
    },
    username: {
        type: String,
        validate: {
            validator: (username) => User.dontExist({ username }),
            message: ({ value }) => `User ${value} has already been taken.`
        }
    },
    name: String,
    password: String
}, {
        timestamps: true
    })


// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         try {
//             this.password = await hash(this.password, 10)
//         } catch (error) {
//             next(error);
//         }
//     }
//     next()
// })

userSchema.statics.dontExist = async function (option) {
    return await this.where(option).countDocuments() === 0
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10)
    }
})

const User = mongoose.model('User', userSchema)
export default User