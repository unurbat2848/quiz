const { Timestamp } = require("mongodb")
const {Schema, model} = require("./connection") // import Schema & model

const QuizSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    category: {type: String, required: true},
    difficulty: {type: String, required: true, default: "normal"},
    userId: {type: Object, required: true},
    createdDate: {type: Date, required: true},
    updatedDate: {type: Date, required: false},
    timeDuration: {type: String, required: false},
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    isActive: {type: Boolean, required: true, default: 0},


})

const Quiz = model("Quiz", QuizSchema)

module.exports = Quiz
