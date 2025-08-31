import mongoose from "mongoose";
import MenuItem from "./MenuItem";

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  items: [{
    MenuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "preparing", "completed", "canceled"],
    default: "pending"
  }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
