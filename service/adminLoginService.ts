// services/admin/auth.service.ts
import { db } from "../config/dbConnection";
import { admin } from "../db/schema/admin";
import { compareData } from '../utils/auth';
import { generateToken } from '../helper/'
import { eq } from "drizzle-orm";

interface UserLogin {
  email:    string;
  password: string;
}

interface LoginResult {
  success: boolean;
  message: string;
  user: {
    id:    number;
    name:  string;
    email: string;
    role:  string;
  };
}

export const loginAdmin = async (payload: UserLogin): Promise<LoginResult> => {
  const { email, password } = payload;

  // ── Step 1: Find admin user ──────────────────────────────
  const user = await db.query.admin.findFirst({
    where: eq(admin.email, email.toLowerCase()),
  });

  if (!user) {
    throw new Error('No admin account found with this email.');
  }

  // ── Step 2: Compare password ─────────────────────────────
  const isMatch = await compareData(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  // ── Step 3: Safe user return karo (password remove) ──────
  const { password: _, ...safeUser } = user;

  // ── Step 4: Result return karo — session route set karega ─
  return {};
};