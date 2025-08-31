import express from "express";
import {
  createTable,
  getTables,
  getTableById,
  updateTableStatus,
  deleteTable
} from "../controllers/tableContoller.js";

const tableRouter = express.Router();

tableRouter.post("/", createTable);           // Add new table
tableRouter.get("/", getTables);              // Get all tables
tableRouter.get("/:id", getTableById);        // Get table by ID
tableRouter.put("/:id", updateTableStatus);   // Update table status
tableRouter.delete("/:id", deleteTable);      // Remove a table

export default tableRouter;
