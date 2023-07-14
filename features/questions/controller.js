import Question from "./model.js";

export const questions = async function (req, res) {
  try {
    const { question, options, correctAnswer, subject } = req.body;

    // Create a new question document
    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      subject,
    });

    // Save the new question to the database
    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new question" });
  }
};

//http://localhost:8085/questions/addQuestion

export const noOfQuestion = async (req, res) => {
  try {
    const numQuestions = parseInt(req.query.numQuestions); // Get the number of questions from the query parameters
    const questions = await Question.find().limit(numQuestions);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve questions" });
  }
};
