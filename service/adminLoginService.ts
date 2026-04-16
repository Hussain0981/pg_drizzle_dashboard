// services/admin/auth.service.ts
import { db } from "../config/dbConnection";
import { admin } from "../db/schema/admin";
import { compareData } from '../utils/auth'
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';
import { ENV } from '../config/dotenv'

interface UserLogin{
    email: string,
    password: string
}
export const loginAdmin = async (payload: UserLogin) => {
    const { email, password } = payload;

    // ── Step 1: Find admin user ─────────────────────────────────
    const user = await db.query.admin.findFirst({
        where: eq(admin.email, email.toLowerCase()),
    });

    if (!user) {
        throw new Error('No admin account found with this email.');
    }
    // ── Step 2: Compare password ──────────────────────────
    const isMatch = await compareData(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password.');
    }

    console.log(isMatch)

    // ── Step 3: Generate JWT token ────────────────────────
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || 'admin',
        },
        ENV.JWT_SECRET,
        { expiresIn: '7d' }
    );

    // ── Step 4: Return safe user + token ──────────────────
    const { password: _, ...safeUser } = user;
    return {
        success: true,
        data: {
            ...safeUser,
            token,
        },
        message: 'Admin login successful.',
    };
};