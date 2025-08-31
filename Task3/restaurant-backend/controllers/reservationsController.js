import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";

// @desc Create a new reservation
// @route POST /api/reservations
export const createReservation = async (req, res) => {
  try {
    const { customerName, customerPhone, table, time, partySize } = req.body;

    // Validating table existence
    const tableDoc = await Table.findById(table);
    if (!tableDoc) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Checking if table has enough capacity
    if (partySize > tableDoc.capacity) {
      return res
        .status(400)
        .json({ message: `Table capacity is ${tableDoc.capacity}, not enough for ${partySize}` });
    }

    // Checking if table is already reserved at the given time
    const existingReservation = await Reservation.findOne({
      table,
      time,
      status: { $in: ["pending", "confirmed"] }
    });

    if (existingReservation) {
      return res.status(400).json({ message: "Table already reserved at this time" });
    }

    const reservation = new Reservation({
      customerName,
      customerPhone,
      table,
      time,
      partySize,
      status: "pending"
    });

    const saved = await reservation.save();

    // Updating table status to reserved
    tableDoc.status = "reserved";
    await tableDoc.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// @desc Get all reservations
// @route GET /api/reservations
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("table");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// @desc Get a single reservation by id
// @route GET /api/reservations/:id
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate("table");
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservation", error });
  }
};

// @desc Update reservation status (confirm/cancel)
// @route PUT /api/reservations/:id
export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    reservation.status = status || reservation.status;
    await reservation.save();

    // Update table status accordingly
    const table = await Table.findById(reservation.table);
    if (status === "confirmed") {
      table.status = "reserved";
    } else if (status === "canceled") {
      table.status = "available";
    }
    await table.save();

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error });
  }
};

// @desc Delete reservation
// @route DELETE /api/reservations/:id
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Free the table
    const table = await Table.findById(reservation.table);
    if (table) {
      table.status = "available";
      await table.save();
    }

    await reservation.deleteOne();
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
};
