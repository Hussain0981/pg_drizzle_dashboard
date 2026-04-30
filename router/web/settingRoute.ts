import type { Response, Request } from "express";
import express from 'express'
import { getByIdService, getByIdService as getByIdMainMenu } from "../../service/adminMenuService";
import { getByIdService as getByIdSubMenu } from "../../service/adminSubmenuService";
import { parseId } from '../../helper/parseId'        
import { renderPage } from '../../helper/renderPage' 
import { attachMainMenu } from '../../middlewares/attachedMainMenu'

const router = express.Router();

// attached main menu for any route
router.use(attachMainMenu);

// GET - /settings
router.get('/', async (req: Request, res: Response) => {
  try {
    renderPage(res, 'settings', 'Settings', {
      mainMenu: res.locals.mainMenu,
    });
  } catch (error) {
    console.error('Error:', error);
    renderPage(res, 'settings', 'Settings - Error', { mainMenu: [] });
  }
});

// GET - Add main menu form
router.get('/add-main-menu', (req: Request, res: Response) => {
  renderPage(res, 'mainMenu', 'Add Main Menu', {
    mainMenu: res.locals.mainMenu
  });
});

// GET - Add sub menu form
router.get('/add-sub-menu', (req: Request, res: Response) => {
  renderPage(res, 'subMenu', 'Add Sub Menu', {
    mainMenu: res.locals.mainMenu
  });
});

// GET - Edit sub menu
router.get('/edit-sub-menu/:id', async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      res.status(400).send('Invalid ID');
      return;
    }

    const record = await getByIdSubMenu(id);

    renderPage(res, 'editSubMenu', 'Edit Sub Menu', {
      mainMenu: res.locals.mainMenu,
      editId: record
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Something went wrong');
  }
});

// GET - Edit main menu
router.get('/edit-main-menu/:id', async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      res.status(400).send('Invalid ID');
      return;
    }

    const idData = await getByIdMainMenu(id);
    if (!idData) {
      res.status(404).send('Menu not found');
      return;
    }

    renderPage(res, 'editMainMenu', 'Edit Main Menu', {
      mainMenu: res.locals.mainMenu,
      data: idData
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Something went wrong');
  }
});

// GET - Navigation
router.get('/navigation/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseId(req.params.id); 
    if (!userId) {
      return res.redirect('back');
    }

    const data = await getByIdService(userId);

    renderPage(res, 'navigation', 'Navigation Setting', {
      mainMenu: res.locals.mainMenu,
      data,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', message);

    res.status(500).render('pages/error', {
      layout: 'layouts/index',
      pageTitle: 'Something went wrong',
      mainMenu: []
    });
  }
});

export default router;