import type { Response, Request } from "express";
import { getAllService } from '../../service/adminMenuService'
import express from 'express'
const router = express.Router();
const data = await getAllService()

// /dashboard page => (main page)
router.get('/', (req: Request, res: Response) => {
  res.render('pages/dashboard', {
    layout: 'layouts/index',
    pageTitle: 'Dashboard',
    currentPage: 'dashboard',
    user: req.session.user,
    appName: 'Full-stack Dashboard',
    menuItems: data
  });
});
export default router;
