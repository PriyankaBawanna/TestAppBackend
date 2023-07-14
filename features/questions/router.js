import express from "express";

import { questions, noOfQuestion } from "./controller.js";
const router = express.Router();

router.post("/addQuestion", questions);

router.get("/questions", noOfQuestion);
export default router;
//http://localhost:8085/questions/addQuestion
