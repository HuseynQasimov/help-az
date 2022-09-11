import { Request, Response } from "express";
import { NurseCrudService } from "../../services/nurse/crud.service";
import { nurseRegistrationValidation } from "../../utils/validations/nurseRegistrationValidation";
import fs from "fs";

export class NurseCrudController {
    private nurseCrudServcie = new NurseCrudService();

    async registerNurse(req: Request, res: Response) {
        try {
            const body = Object.assign(req.body, { photo: req.file?.path });

            const { error } = nurseRegistrationValidation.validate(body);

            if (error) {
                if (req.file?.path) {
                    fs.unlink(req.file.path, (): void => {});
                }
                return res.status(400).json(error.message);
            }

            const resp = await this.nurseCrudServcie.create(body);

            if (resp === 409) {
                return res.status(409).json("Email already registered");
            }

            return res.status(201).json(resp);
        } catch (error) {
            if (req.file?.path) {
                fs.unlink(req.file.path, (): void => {});
            }

            res.status(500).json(error);
        }
    }

    async getNurses(req: Request, res: Response) {
        try {
            const resp = await this.nurseCrudServcie.find(req.query);

            return res.status(200).json(resp);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
