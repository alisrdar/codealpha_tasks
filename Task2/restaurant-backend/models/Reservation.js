import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  time: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending"
  }
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
