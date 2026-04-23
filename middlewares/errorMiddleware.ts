// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

// 404 handler
export function notFound(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(404).render('errors/404', {
    pageTitle: '404 - Page Not Found',
    url: req.originalUrl,
  });
}

// Global error handler 
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction 
): void {
  console.error('Error:', err.stack);

  const status = (err as any).status ?? 500;

  res.status(status).render('errors/500', {
    pageTitle: 'Server Error',
    message: process.env.NODE_ENV === 'development'
      ? err.message
      : 'some error....',
  });
}