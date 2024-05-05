const {Schema, model} = require("./connection") // import Schema & model

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, require: true}
})

const User = model("User", UserSchema)

module.exports = User
