import Inventory from "../models/Inventory.js";

// @desc Get all inventory items
// @route GET /api/inventory
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory", error });
  }
};

// @desc Get single inventory item
// @route GET /api/inventory/:id
export const getInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item", error });
  }
};

// @desc Add new inventory item
// @route POST /api/inventory
export const addInventoryItem = async (req, res) => {
  try {
    const { name, quantity, unit, threshold } = req.body;

    const itemExists = await Inventory.findOne({ name });
    if (itemExists) {
      return res.status(400).json({ message: "Item already exists" });
    }

    const newItem = await Inventory.create({
      name,
      quantity,
      unit,
      threshold,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to add inventory item", error });
  }
};

// @desc Update inventory item
// @route PUT /api/inventory/:id
export const updateInventoryItem = async (req, res) => {
  try {
    const { name, quantity, unit, threshold } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      { name, quantity, unit, threshold },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update inventory item", error });
  }
};

// @desc Delete inventory item
// @route DELETE /api/inventory/:id
export const deleteInventoryItem = async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error });
  }
};

// @desc Check low stock items
// @route GET /api/inventory/low-stock
export const getLowStockItems = async (req, res) => {
  try {
    const lowStock = await Inventory.find(
        { $expr: { $lt: ["$quantity", "$threshold"] } }
    );
    res.status(200).json(lowStock);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch low stock items", error });
  }
};
