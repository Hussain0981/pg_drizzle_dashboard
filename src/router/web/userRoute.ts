import express from "express";
import * as controller from "../../controller/web/userController";

const router = express.Router();

router.get("/register", controller.createController);
router.get("/login", controller.loginController);
router.get("/verify", controller.verifyUserController);
router.get("/resend-otp", controller.resendOtpController);
router.get("/forgot-password", controller.forgotPasswordController);
router.get("/reset-password", controller.resetPasswordController);

export default router;