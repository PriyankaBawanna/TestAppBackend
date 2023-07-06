import express from "express";

import { questions } from "./controller.js";
const router = express.Router();

router.post("/addQuestion", questions);

export default router;
