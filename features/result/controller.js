import { uuid } from "uuidv4";
import Result from "./model.js";
import Question from "../questions/model.js";
export const testSession = async function (req, res) {
  const { testName } = req.body;

  // Generate a unique session ID using uuid
  const sessionId = uuid();

  // Create a new test session object
  const testSession = {
    testName,
    sessionId,
    startTime: new Date(),
  };

  res.json(testSession);
};

export const saveUserResponse = async (req, res) => {
  try {
    const { sessionId, user_id, QuestionId, testName, userAnswer, startTime } =
      req.body;

    const userResponse = new Result({
      sessionId,
      user_id,
      testName,
      startTime,
      QuestionId,
      userAnswer,
      createdAt: new Date().getTime(),
    });

    const savedResponse = await userResponse.save();

    res.status(201).json({
      message: "User response successfully saved",
      result: savedResponse,
    });
  } catch (error) {
    console.error("Error saving user response to database:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the user's response" });
  }
};

export const updateUserResponse = async (req, res) => {
  const sessionId = req.params.sessionId;
  const QuestionId = req.params.QuestionId;
  const { userAnswer } = req.body;

  try {
    const testResult = await Result.findOneAndUpdate(
      { sessionId, QuestionId: QuestionId },
      { $set: { userAnswer: userAnswer } },
      { new: true }
    );

    if (!testResult) {
      return res.status(404).json({ error: "Test result not found" });
    }

    res.json(testResult);
  } catch (error) {
    console.error("Error updating test result:", error);
    res.status(500).json({ error: "Failed to update test result" });
  }
};

export const generateUserResult = async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    // Find all test results for the given sessionId
    const testResults = await Result.find({ sessionId });

    if (testResults.length === 0) {
      return res
        .status(404)
        .json({ error: "No test results found for the session" });
    }

    const totalQuestions = testResults.length;
    let correctCount = 0;

    // Check each test result against the correct answer
    for (const testResult of testResults) {
      const { QuestionId, userAnswer } = testResult;

      // Find the corresponding question
      const question = await Question.findOne({ _id: QuestionId });

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      // Check if the user's answer matches the correct answer
      if (question.correctAnswer === userAnswer) {
        correctCount++;
      }
    }

    // Calculate the percentage of correct answers
    const percentage = (correctCount / totalQuestions) * 100;

    res.json({
      totalQuestions,
      correctCount,
      percentage,
    });
  } catch (error) {
    console.error("Error generating result:", error);
    res.status(500).json({ error: "Failed to generate result" });
  }
};
