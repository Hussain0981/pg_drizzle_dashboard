// src/middleware/activityLogger.ts
import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { activityLogs } from '../db/schema';

export function activityLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Response finish hone ke baad log karo
  res.on('finish', async () => {
    if (req.session?.user) {
      try {
        await db.insert(activityLogs).values({
          userId:    req.session.user.id,
          method:    req.method,
          url:       req.originalUrl,
          status:    res.statusCode,
          ip:        req.ip ?? '',
          userAgent: req.headers['user-agent'] ?? '',
        });
      } catch (err) {
        console.error('Activity log error:', err);
      }
    }
  });
  next();
}