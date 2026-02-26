import express from "express";
import { authMe, updateInformation } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMe);
router.put("/update", updateInformation);

export default router;
