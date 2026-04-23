// src/middleware/menuMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { mainMenu } from '../db/schema/navigationItems';
import { eq, asc } from 'drizzle-orm';
import { Role } from '../types/roles';

// Cache per role
const cache = new Map<string, { data: any[]; time: number }>();
const TTL = 5 * 60 * 1000;

export async function menuMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const role: Role = req.session?.user?.role ?? 'guest';
    const cached = cache.get(role);

    if (cached && Date.now() - cached.time < TTL) {
      res.locals.menuItems = cached.data;
      return next();
    }

    // DB se fetch — role filter
    const allMenus = await db
      .select()
      .from(mainMenu)
      .where(eq(mainMenu.isActive, true))
      .orderBy(asc(mainMenu.order));

    // Role ke hisaab se filter karo
    const filtered = allMenus.filter((menu: unknown) => {
      if (!menu.roles || menu.roles.length === 0) return true; // sab ke liye
      return menu.roles.includes(role);
    });

    cache.set(role, { data: filtered, time: Date.now() });
    res.locals.menuItems = filtered;
    next();

  } catch (error) {
    console.error('Menu middleware error:', error);
    res.locals.menuItems = [];
    next();
  }
}