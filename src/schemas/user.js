import Joi from "joi"

const email = Joi.string().email().required().label('Email')
const username = Joi.string().alphanum().min(4).max(30).required().label('Username')
const name = Joi.string().max(254).required().label('Name')
const password = Joi.string().min(8).max(50).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).label('Password').options({
    language: {
        string: {
            regex: {
                base: "must have at least one lowercase..."
            }
        }
    }
})

export const signUp = Joi.object().keys({
    email,
    username,
    name,
    password
})

export const signIn = Joi.object().keys({
    username,
    password
})