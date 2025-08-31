import express from 'express';

const menuRouter = express.Router();

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
