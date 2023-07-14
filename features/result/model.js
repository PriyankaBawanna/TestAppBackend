import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  QuestionId: {
    type: String,
    required: true,
  },
  userAnswer: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: true,
  },

  sessionId: {
    type: String,
    required: true,
  },

  user_id: { type: String, required: true },
  testName: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
});

const Result = mongoose.model("Result", testResultSchema);

export default Result;
