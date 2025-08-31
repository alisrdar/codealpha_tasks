import Table from "../models/Table.js";

// Create a new table
export const createTable = async (req, res) => {
  try {
    const { number, capacity } = req.body;
    const table = new Table({ number, capacity });
    await table.save();
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tables
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single table by id
export const getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update table status (reserve, occupy, free)
export const updateTableStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a table
export const deleteTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
