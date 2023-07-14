import express from "express";
import cors from "cors";
import "./services/db.js";
import testResultRouter from "./features/result/router.js";
import user from "./features/user/route.js";
import questions from "./features/questions/router.js";
import Question from "./features/questions/model.js";
import Result from "./features/result/model.js";
//import { uuid } from "uuidv4";
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/add", user);
app.use("/login", user);
app.use("/userDetails", user);
app.use("/questions", questions);

app.use("/noOfQuestions", questions);
app.use("/sessionForTest", testResultRouter);
app.use("/userResponse", testResultRouter);
app.use("/update-response", testResultRouter);
app.use("/result", testResultRouter);

app.listen(8085, () => {
  console.log("Server is running on port ...");
});
