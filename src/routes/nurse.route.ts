import express, { Request, Response } from "express";
import { NurseCrudController } from "../controllers/nurse/crud.controller";
import config from "config";
import multer from "multer";
import { checkFileType } from "../helpers/imageValidation";
import { AuthController } from "../controllers/nurse/auth.controller";
import { auth } from "../helpers/validateToken";

const upload = multer({
    dest: config.get("images-path"),
    limits: {
        fields: 5,
        fileSize: 5000000,
    },
    fileFilter: (_req, file, callback) => {
        checkFileType(file, callback);
    },
});

const nurseRouter = express.Router();

const nurseCrudController = new NurseCrudController();
const authController = new AuthController();

// Routes
nurseRouter.post("/login", async (req, res) => await authController.login(req, res));
nurseRouter.post(
    "/",
    upload.single("profile_photo"),
    async (req, res) => await nurseCrudController.registerNurse(req, res)
);
nurseRouter.get("/", auth, async (req, res) => await nurseCrudController.getNurses(req, res));

export default nurseRouter;
