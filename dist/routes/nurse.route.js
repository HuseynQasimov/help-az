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
const express_1 = __importDefault(require("express"));
const crud_controller_1 = require("../controllers/nurse/crud.controller");
const config_1 = __importDefault(require("config"));
const multer_1 = __importDefault(require("multer"));
const imageValidation_1 = require("../helpers/imageValidation");
const auth_controller_1 = require("../controllers/nurse/auth.controller");
const validateToken_1 = require("../helpers/validateToken");
const upload = (0, multer_1.default)({
    dest: config_1.default.get("images-path"),
    limits: {
        fields: 5,
        fileSize: 5000000,
    },
    fileFilter: (_req, file, callback) => {
        (0, imageValidation_1.checkFileType)(file, callback);
    },
});
const nurseRouter = express_1.default.Router();
const nurseCrudController = new crud_controller_1.NurseCrudController();
const authController = new auth_controller_1.AuthController();
// Routes
nurseRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield authController.login(req, res); }));
nurseRouter.post("/", upload.single("profile_photo"), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield nurseCrudController.registerNurse(req, res); }));
nurseRouter.get("/", validateToken_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield nurseCrudController.getNurses(req, res); }));
exports.default = nurseRouter;
