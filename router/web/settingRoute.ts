import type { Response, Request } from "express";
import express from 'express'
import { getAllService as getSubMenuService, getByIdService as getByIdSubMenu } from "../../service/adminSubmenuService";
import { getAllService as getMainMenuService, getByIdService as getByIdMainMenu } from "../../service/adminMenuService";

const router = express.Router();

// GET - /settings
router.get('/', async (req: Request, res: Response) => {
  try {
    // Har request pe fresh data
    const mainMenuData = await getMainMenuService();
    const subMenuData = await getSubMenuService();

    res.render('pages/settings', {
      layout: 'layouts/index',
      pageTitle: 'Settings',
      mainMenu: mainMenuData || [],
      subMenu: subMenuData || []
    });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).render('pages/settings', {
      layout: 'layouts/index',
      pageTitle: 'Settings - Error',
      mainMenu: [],
      subMenu: []
    });
  }
});

// GET - Add main menu form
router.get('/add-main-menu', (req: Request, res: Response) => {
  res.render('pages/mainMenu', {
    layout: 'layouts/index',
    pageTitle: 'Add Main Menu'
  });
});

// GET - Add sub menu form
router.get('/add-sub-menu', async (req: Request, res: Response) => {
  try {
    // Fresh data har baar
    const mainMenuData = await getMainMenuService();

    res.render('pages/subMenu', {
      layout: 'layouts/index',
      pageTitle: 'Add Sub Menu',
      mainMenu: mainMenuData || []
    });
  } catch (error) {
    console.error('Error fetching main menu:', error);
    res.render('pages/subMenu', {
      layout: 'layouts/index',
      pageTitle: 'Add Sub Menu',
      mainMenu: []
    });
  }
});

// GET - Edit sub menu
router.get('/edit-sub-menu/:id', async (req: Request, res: Response) => {
  try {
    // NaN check
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
    }

    const mainMenuData = await getMainMenuService();
    const record = await getByIdSubMenu(id)

    res.render('pages/editSubMenu', {
      layout: 'layouts/index',
      pageTitle: 'Edit Sub Menu',
      mainMenu: mainMenuData || [],
      editId: record
    });
  } catch (error) {
    console.error('Error fetching sub menu:', error);
    res.status(500).send('Something went wrong');
  }
});

// GET - Edit main menu
router.get('/edit-main-menu/:id', async (req: Request, res: Response) => {
  try {
    // parseInt aur NaN check try ke andar
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
    }

    // getByIdService
    const [mainMenuData, idData] = await Promise.all([
      getMainMenuService(),
      getByIdMainMenu(id)
    ]);

    if (!idData) {
      res.status(404).send('Menu not found');
      return;
    }

    res.render('pages/editMainMenu', {
      layout: 'layouts/index',
      pageTitle: 'Edit Main Menu',
      mainMenu: mainMenuData || [],
      data: idData
    });
  } catch (error) {
    console.error('Error fetching main menu by id:', error);
    res.status(500).send('Something went wrong');
  }
});



export default router;