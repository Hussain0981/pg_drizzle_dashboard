// src/middleware/auth/isAuthenticated.ts
import { Request, Response, NextFunction } from 'express';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.session?.user) {
    res.locals.currentUser = req.session.user;
    next();
  } else {
    // API request hai ya web?
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      res.status(401).json({ error: 'Please login first' });
    } else {
      res.redirect('/login');
    }
  }
}