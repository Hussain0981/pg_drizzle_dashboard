// controllers/adminLoginController.ts
import { Request, Response } from 'express';
import { loginAdmin } from '../service/adminLoginService';

// Extend session type to avoid TS errors
declare module 'express-session' {
  interface SessionData {
    userId: string;
    name: string;
    email: string;
    role: string;
    isSuperAdmin: boolean;
  }
}

export const adminLoginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please enter email and password',
      });
      return;
    }

    const result = await loginAdmin({ email, password });

    // ✅ Correct: use req.session, not session.Store
    req.session.userId     = result.user.id;
    req.session.name       = result.user.name;
    req.session.email      = result.user.email;
    req.session.role       = result.user.role;
    req.session.isSuperAdmin = result.user.role === 'super_admin';

    res.cookie('auth_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      redirect: result.user.role === 'super_admin' ? '/dashboard' : '',
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    });
  }
};

// controllers/meController.ts
export const getMeController = (req: Request, res: Response): void => {
  // Check if session exists
  if (!req.session.userId) {
    res.status(401).json({
      success: false,
      message: 'Not logged in',
    });
    return;
  }

  // Return session data
  res.status(200).json({
    success: true,
    user: {
      id:          req.session.userId,
      name:        req.session.name,
      email:       req.session.email,
      role:        req.session.role,
      isSuperAdmin: req.session.isSuperAdmin,
    },
  });
};