import express from "express";
import { adminLoginController, getMeController } from "../../controller/adminLoginController";

const router = express.Router();

router.post("/super-admin-login", adminLoginController);
router.get("/me", getMeController);

export default router;