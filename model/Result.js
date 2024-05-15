const { Schema, model } = require("./connection") // import Schema & model

const ResultSchema = new Schema({
    studentId: { type: Object, required: true },
    quizId: { type: Object, required: true },
    questionId: { type: Object, required: true },
    optionId: { type: Object, required: true },
    isCorrect: { type: Boolean, required: true}

}, {
    timestamps: true
})

const Result = model("Result", ResultSchema)

module.exports = Result
