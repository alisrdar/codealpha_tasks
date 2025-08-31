import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: "pcs" // kg, g, lbs, etc.
  },
  threshold: {
    type: Number,
    default: 10 // alert when quantity goes below this
  }
}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
