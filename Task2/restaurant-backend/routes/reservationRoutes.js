import express from "express";

const reservationRouter = express.Router();

import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation
} from "../controllers/reservationsController.js";

reservationRouter.post("/", createReservation);
reservationRouter.get("/", getReservations);
reservationRouter.get("/:id", getReservationById);
reservationRouter.put("/:id", updateReservationStatus);
reservationRouter.delete("/:id", deleteReservation);

export default reservationRouter;