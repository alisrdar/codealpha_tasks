import e from 'express'
import express from 'express'

const inventoryRouter = express.Router();

import { 
    addInventoryItem,
    getInventory,
    getInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getLowStockItems
 } from '../controllers/inventoryController.js';

inventoryRouter.post('/', addInventoryItem);
inventoryRouter.get('/', getInventory);
inventoryRouter.get('/:id', getInventoryItem);
inventoryRouter.put('/:id', updateInventoryItem);
inventoryRouter.delete('/:id', deleteInventoryItem);
inventoryRouter.get('/low-stock', getLowStockItems);

export default inventoryRouter;