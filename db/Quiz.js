const {Schema, model} = require("../db/connection") // import Schema & model

const QuizSchema = new Schema({
    username: {type: String, required: true},
    reminder: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false}
})

const Quiz = model("Quiz", QuizSchema)

module.exports = Quiz
