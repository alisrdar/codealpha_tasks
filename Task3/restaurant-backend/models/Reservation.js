import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    match: [/^\+?[0-9]{10,15}$/, "Invalid phone number"]
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  time: {
    type: Date,
    required: true 
  },
  duration: {
    type: Number,
    default: 120
  },
  people: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled", "completed"],
    default: "pending"
  }
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
