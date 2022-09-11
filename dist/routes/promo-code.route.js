"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateToken_1 = require("../helpers/validateToken");
const express_1 = __importDefault(require("express"));
const crud_controller_1 = require("../controllers/promocode/crud.controller");
const promoCodeRouter = express_1.default.Router();
const promoCodeController = new crud_controller_1.PromoCodeController();
promoCodeRouter.post("/", validateToken_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield promoCodeController.create(req, res); }));
promoCodeRouter.get("/:code", validateToken_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield promoCodeController.findOne(req, res); }));
promoCodeRouter.get("/", validateToken_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield promoCodeController.findAll(req, res); }));
promoCodeRouter.delete("/:id", validateToken_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield promoCodeController.delete(req, res); }));
exports.default = promoCodeRouter;
