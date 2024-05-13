const {Schema, model} = require("./connection") // import Schema & model

const StudentSchema = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String,  required: true},
    token: {type: String, unique: true, required: true}

})

const Student = model("Student", StudentSchema)

module.exports = Student
