import express from "express";
import {adminLoginController} from "../../controller/adminLoginController";

const router = express.Router();

router.post("/super-admin-login", adminLoginController);

export default router;