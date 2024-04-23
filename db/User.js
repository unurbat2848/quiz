const {Schema, model} = require("../db/connection") // import Schema & model

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})

const User = model("User", UserSchema)

module.exports = User
