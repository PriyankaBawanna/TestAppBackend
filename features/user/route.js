import express from "express";
import { addUser, loginUser, getUserDetails } from "./controller.js";

const router = express.Router();

router.post("/addUser", addUser);
router.post("/loginUser", loginUser);
router.get("/getUserDetails/:email", getUserDetails);

export default router;
