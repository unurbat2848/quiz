const { Timestamp, ObjectId } = require("mongodb")
const { Schema, model } = require("./connection") // import Schema & model
const OptionSchema = new Schema({
    index: { type: String, required: true },
    title: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
});
const QuestionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    correctAnswer: { type: String, required: true },
    options: { type: [OptionSchema] }
});

const QuizSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, required: true, default: "medium" },
    userId: { type: Object, required: true },
    isActive: { type: Boolean, required: true, default: 0 },
    questions: { type: [QuestionSchema] },

}, { timestamps: true })

const Quiz = model("Quiz", QuizSchema)

module.exports = Quiz
