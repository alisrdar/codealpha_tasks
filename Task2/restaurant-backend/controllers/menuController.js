import MenuItem from "../models/MenuItem";

// Get all menu Items
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items", details: error.message });
  }
}
// Get Single Menu Item
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu item", details: error.message });
  }
}
// Create New Menu Item
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, available } = req.body;
    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      category,
      available
    });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create menu item", details: error.message });
  }
}
// Update Menu Item
export const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, available } = req.body;

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      category,
      available
    }, { new: true });

    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item", details: error.message });
  }
}
// Delete Menu Item
export const deleteMenuItem = async (req,res) => {
  try {
    const {id} = req.params.id;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if(!deleteMenuItem){
      return res.status(404).json({error: "Menu item not Found!"})
    }
    res.status(200).json({message: "Menu Item Deleted Successfully!"})
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item", details: error.message });
  }
}