import { Request, Response } from "express";
import { ServiceCrudService } from "../../services/service/crud.service";
import { serviceValidation } from "../../utils/validations/serviceValidation";

export class ServiceController {
    private serviceCrudService = new ServiceCrudService();

    async create(req: Request, res: Response) {
        try {
            const { error } = serviceValidation.validate(req.body);

            if (error) {
                return res.status(400).json(error.message);
            }

            const resp = await this.serviceCrudService.create(req.body);

            if (resp === 409) {
                return res.status(409).json("Duplicate service");
            }

            return res.status(201).json(resp);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            return res.status(200).json(await this.serviceCrudService.find());
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            if (!req.params.id) {
                return res.status(400).json("Bad request");
            }

            return res.status(200).json(await this.serviceCrudService.delete(req.params.id));
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
