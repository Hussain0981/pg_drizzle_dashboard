import { Request, Response } from "express";
import { loginAdmin } from '../service/adminLoginService'
import { successResponse, failureResponse } from "../helper/sendResponse";

interface Admin {
    password: string,
    email: string
}

export const adminLoginController = async (req: Request, res: Response) => {
    try {
        const payload: Admin = req.body
        const user = await loginAdmin(payload);
        successResponse(res, user, 'Admin login successfully');

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Failed to login admin';
        failureResponse(res, errorMessage);
    }
};