import type { Response, Request } from "express";
import express from 'express'
const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
    res.render('admin/login', {
        title: 'Admin Login'
    });
});
export default router;
