import Order from "../models/Orders.js";
import MenuItem from "../models/MenuItem.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
}
export const getOrderById = async (req, res) => { 
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
}

export const createOrder = async (req, res) => {
    try {
        const {customerName, items, table} = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Items are required" });
        }
        let totalAmount = 0;
        for (const item of items) {
            const menuItem = await MenuItem.findById(item.menuItem);
            if (!menuItem) {
                return res.status(400).json({ message: `Menu item with ID ${item.menuItem} not found` });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        const newOrder = new Order({
            customerName, 
            items, 
            table,
            totalPrice: totalAmount
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
}

// Update Order
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("items.menuItem").populate("table");

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Server error", message: error.message });
    }
}

