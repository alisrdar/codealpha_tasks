import express from 'express';

const menuRouter = express.menuRouter();

import {
    getMenuItemById,
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} from '../controllers/menuController.js';

menuRouter.get('/',getAllMenuItems);

menuRouter.get('/:id',getMenuItemById);

menuRouter.post('/',createMenuItem);

menuRouter.put('/:id',updateMenuItem);

menuRouter.delete('/:id',deleteMenuItem);

export default menuRouter;
