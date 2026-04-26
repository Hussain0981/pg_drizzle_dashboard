
import { Request, Response, NextFunction } from 'express';
import { getAllService } from '../service/adminSubmenuService'; 

export const layoutDataMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await getAllService();
    res.locals.menuItems  = { data };

    res.locals.user = {
      name:  req.session?.name  || '',
      email: req.session?.email || '',
      role:  req.session?.role  || '',
    };

  } catch (error) {
    console.error('Layout middleware error:', error);
    res.locals.menuItem = { data: [] };
    res.locals.user = {};
  }

  next();
};