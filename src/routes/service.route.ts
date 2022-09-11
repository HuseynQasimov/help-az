import { auth } from "../helpers/validateToken";
import express from "express";
import { ServiceController } from "../controllers/service/crud.controller";

const serviceRouter = express.Router();

const serviceController = new ServiceController();

serviceRouter.post("/", auth, async (req, res) => await serviceController.create(req, res));
serviceRouter.get("/", auth, async (req, res) => await serviceController.findAll(req, res));
serviceRouter.delete("/:id", auth, async (req, res) => await serviceController.delete(req, res));

export default serviceRouter;
