import express from "express";
import userRoutes from "./userRoute";

const router = express.Router();

router.use("/v1/user", userRoutes);
// router.use("/product", productRoutes); // future routes

export default router;