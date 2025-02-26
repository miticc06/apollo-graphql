import { AuthenticationError } from "apollo-server-express"
import { User } from "./models"
import { SESS_NAME } from "./config";
export const attemptSignIn = async (email, password) => {
    const message = 'Incorrect email or password. Please try again.'
    const user = await User.findOne({ email })
    if (!user) {
        throw new AuthenticationError(message)
    }
    if (!await user.matchesPassword(password)) {
        throw new AuthenticationError('Password incorrect');
    }
    return user
}

const signedIn = req => req.session.userId
export const signOut = (req, res) => new Promise(
    (resolve, reject) => {
        req.session.destroy(err => {
            if (err) {
                reject(err)
            }

            res.clearCookie(SESS_NAME)

            resolve(true)
        })
    }

)


export const checkSignedIn = (req) => {
    if (!signedIn(req)) {
        throw new AuthenticationError("you must be sign in.")
    }
}

export const checkSignedOut = (req) => {
    if (signedIn(req)) {
        throw new AuthenticationError("You are already signed in.")
    }
}
