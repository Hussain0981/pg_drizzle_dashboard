// src/middleware/setLocals.ts
import { Request, Response, NextFunction } from 'express';

export function setLocals(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.locals.currentUser = req.session?.user ?? null;
  res.locals.currentPage = '';
  res.locals.pageTitle   = 'MyApp';
  next();
}