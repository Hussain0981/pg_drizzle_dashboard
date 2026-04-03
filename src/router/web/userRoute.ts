import express, { Request, Response } from "express";
const router = express.Router();

router.get("/register", (req: Request, res: Response) => res.render(`users/register`));
router.get("/login", (req: Request, res: Response) => res.render(`users/login`));
router.get("/verify", (req: Request, res: Response) => res.render(`users/verify`));
router.get("/resend-otp", (req: Request, res: Response) => res.render(`users/resendOtp`));
router.get("/forgot-password", (req: Request, res: Response) => res.render(`users/forgotPassword`));
router.get("/verify-forgot-password", (req: Request, res: Response) => res.render(`users/verifyForgotPassword`));
router.get("/reset-password", (req: Request, res: Response) => res.render(`users/resetPassword`));

export default router;