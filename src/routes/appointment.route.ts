import { auth } from "../helpers/validateToken";
import express from "express";
import { AppointmentController } from "../controllers/appointment/crud.controller";

const appointmentRouter = express.Router();

const appointmentController = new AppointmentController();

appointmentRouter.post("/", auth, async (req, res) => await appointmentController.create(req, res));
// serviceRouter.get("/", auth, async (req, res) => await appointmentController.findAll(req, res));
// serviceRouter.delete("/:id", auth, async (req, res) => await appointmentController.delete(req, res));

export default appointmentRouter;
