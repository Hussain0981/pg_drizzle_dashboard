import { Request, Response, NextFunction } from "express";
import { getAllService as getMainMenuService } from "../service/adminMenuService";

export const attachMainMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.mainMenu = await getMainMenuService() || [];
  } catch {
    res.locals.mainMenu = [];
  }
  next();
};