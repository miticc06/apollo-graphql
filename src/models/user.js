import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
})


// User.insertMany([
//     { email:  }
// ])


export default mongoose.model('User', userSchema) 