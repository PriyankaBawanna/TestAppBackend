import express from "express";
import cors from "cors";
import "./services/db.js";
import user from "./features/user/route.js";
import questions from "./features/questions/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/add", user);
app.use("/login", user);
app.use("/userDetails", user);
app.use("/addQuestion", user);
app.use("/questions", questions);

app.listen(8085, () => {
  console.log("Server is running on port ...");
});
