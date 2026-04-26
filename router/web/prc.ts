import type { Response, Request } from "express";
import express from 'express'

const router = express.Router();

// GET - /settings
router.get('/', async (req: Request, res: Response) => {
  try {
    res.render('pages/prc', {
        pageTitle: 'practus page',
        data: ['kahn', 'ali', 'japan', 'kor', 'items', 'indonesia']
    });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).render('pages/settings', {
    });
  }
});



export default router;