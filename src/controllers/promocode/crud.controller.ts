import { Request, Response } from "express";
import { PromoCodeCrudService } from "../../services/promocode/crud.service";
import { promoCodeValidation } from "../../utils/validations/promoCodeValidation";

export class PromoCodeController {
    private promoCodeCrudService = new PromoCodeCrudService();

    async create(req: Request, res: Response) {
        try {
            const { error } = promoCodeValidation.validate(req.body);

            if (error) {
                return res.status(400).json(error.message);
            }

            const resp = await this.promoCodeCrudService.create(req.body);

            if (resp === 409) {
                return res.status(409).json("Duplicate service");
            }

            return res.status(201).json(resp);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const resp = await this.promoCodeCrudService.findOne(req.params.code);

            if (!resp) {
                return res.status(404).json();
            }
            return res.status(200).json(resp);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            return res.status(200).json(await this.promoCodeCrudService.find());
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            if (!req.params.id) {
                return res.status(400).json("Bad request");
            }

            return res.status(200).json(await this.promoCodeCrudService.delete(req.params.id));
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
