import { auth } from "../helpers/validateToken";
import express from "express";
import { PromoCodeController } from "../controllers/promocode/crud.controller";

const promoCodeRouter = express.Router();

const promoCodeController = new PromoCodeController();

promoCodeRouter.post("/", auth, async (req, res) => await promoCodeController.create(req, res));
promoCodeRouter.get(
    "/:code",
    auth,
    async (req, res) => await promoCodeController.findOne(req, res)
);
promoCodeRouter.get("/", auth, async (req, res) => await promoCodeController.findAll(req, res));
promoCodeRouter.delete(
    "/:id",
    auth,
    async (req, res) => await promoCodeController.delete(req, res)
);

export default promoCodeRouter;
