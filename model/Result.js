const { Schema, model } = require("./connection") // import Schema & model

const StudentSchema = new Schema({
    id: {type: String,  required: true},
    email: {type: String, required: true},
    username: {type: String,  required: true}

})

const ResultSchema = new Schema({
    student: { type: StudentSchema, required: true },
    quizId: { type: String, required: true },
    questionId: { type: String, required: true },
    optionId: { type: String, required: true },
    isCorrect: { type: Boolean, required: true}

}, {
    timestamps: true
})

const Result = model("Result", ResultSchema)

module.exports = Result
