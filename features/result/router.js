import express from "express";
import {
  testSession,
  saveUserResponse,
  updateUserResponse,
  generateUserResult,
} from "./controller.js";

const router = express.Router();

router.post("/test-sessions", testSession);
router.post("/user-response", saveUserResponse);
router.put(
  "/testResults/:sessionId/userAnswer/:QuestionId",
  updateUserResponse
);
router.post("/generateResult/:sessionId", generateUserResult);

export default router;
