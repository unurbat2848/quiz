const mongoose = require("mongoose")
const { Schema, model } = require("./connection") // import Schema & model
const OptionSchema = new mongoose.Schema({
    index: { type: String, required: true },
    title: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
},{
    toJSON: {
        getters: true, virtuals: false
   }
});
const QuestionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    correctAnswer: { type: String, required: true },
    options: { type: [OptionSchema] }
},{
     toJSON: {
        getters: true, virtuals: false
    }
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    code: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, required: true, default: "medium" },
    userId: { type: Object, required: true },
    isActive: { type: Boolean, required: true, default: 0 },
    questions: { type: [QuestionSchema] },

}, {
    timestamps: true, toJSON: {
        getters: true, virtuals: false
    }
})


const Quiz = mongoose.model("Quiz", QuizSchema)

module.exports = Quiz
