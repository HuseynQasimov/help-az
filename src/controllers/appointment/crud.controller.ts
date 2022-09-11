import { Request, Response } from "express";
import { AppointmentCrudService } from "../../services/appointment/crud.service";
import { PromoCodeCrudService } from "../../services/promocode/crud.service";
import { ServiceCrudService } from "../../services/service/crud.service";
import { getIO } from "../../services/socket/socket";
import { appointmentValidation } from "../../utils/validations/appointmentValidation";

export class AppointmentController {
    private appointmentCrudService = new AppointmentCrudService();
    private serviceCrudService = new ServiceCrudService();
    private promoCodeCrudService = new PromoCodeCrudService();

    async create(req: Request, res: Response) {
        try {
            const { error } = appointmentValidation.validate(req.body);

            if (error) {
                return res.status(400).json(error.message);
            }

            const service = await this.serviceCrudService.findOne(req.body.service);

            if (!service) {
                return res.status(404).json("Service not found");
            }

            let promoCode = null;
            if (req.body.promo_code) {
                promoCode = await this.promoCodeCrudService.findOne(req.body.promo_code);
            }

            const body = { ...req.body, service, promo_code: promoCode };
            const resp = await this.appointmentCrudService.create(body);

            const io = getIO();
            io?.emit("new_appointment", resp);

            return res.status(201).json(resp);
        } catch (error) {
            console.log("<Appointment create controller>", error);

            return res.status(500).json(error);
        }
    }

    async update() {}

    // async findOne(req: Request, res: Response) {
    //     try {
    //         const resp = await this.appointmentCrudService.findOne(req.params.code);

    //         if (!resp) {
    //             return res.status(404).json();
    //         }
    //         return res.status(200).json(resp);
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // }

    // async findAll(req: Request, res: Response) {
    //     try {
    //         return res.status(200).json(await this.appointmentCrudService.find());
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // }

    // async delete(req: Request, res: Response) {
    //     try {
    //         if (!req.params.id) {
    //             return res.status(400).json("Bad request");
    //         }

    //         return res.status(200).json(await this.appointmentCrudService.delete(req.params.id));
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // }
}
