import type { Response, Request } from "express";
import express from 'express'
const router = express.Router();

// /dashboard page => (main page)
router.get('/', (req: Request, res: Response) => {
  res.render('pages/dashboard', {
    layout: 'layouts/index',
    pageTitle: 'Dashboard',
    currentPage: 'dashboard',
    user: req.session.user,
    appName: 'Full-stack Dashboard',
  });
});
export default router;
