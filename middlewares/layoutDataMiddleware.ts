// middlewares/layoutDataMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { getAllService } from '../service/adminSubmenuService'; // apna path check karo

export const layoutDataMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await getAllService();

    // ✅ EJS mein "mainMenu" naam se access hoga
    res.locals.mainMenu = { data };

    res.locals.user = {
      name:  req.session?.name  || '',
      email: req.session?.email || '',
      role:  req.session?.role  || '',
    };

  } catch (error) {
    console.error('Layout middleware error:', error);
    // ✅ Error pe bhi locals set karo — warna EJS crash karega
    res.locals.mainMenu = { data: [] };
    res.locals.user = {};
  }

  next();
};