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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const crud_service_1 = require("../../services/appointment/crud.service");
const crud_service_2 = require("../../services/promocode/crud.service");
const crud_service_3 = require("../../services/service/crud.service");
const socket_1 = require("../../services/socket/socket");
const appointmentValidation_1 = require("../../utils/validations/appointmentValidation");
class AppointmentController {
    constructor() {
        this.appointmentCrudService = new crud_service_1.AppointmentCrudService();
        this.serviceCrudService = new crud_service_3.ServiceCrudService();
        this.promoCodeCrudService = new crud_service_2.PromoCodeCrudService();
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = appointmentValidation_1.appointmentValidation.validate(req.body);
                if (error) {
                    return res.status(400).json(error.message);
                }
                const service = yield this.serviceCrudService.findOne(req.body.service);
                if (!service) {
                    return res.status(404).json("Service not found");
                }
                let promoCode = null;
                if (req.body.promo_code) {
                    promoCode = yield this.promoCodeCrudService.findOne(req.body.promo_code);
                }
                const body = Object.assign(Object.assign({}, req.body), { service, promo_code: promoCode });
                const resp = yield this.appointmentCrudService.create(body);
                const io = (0, socket_1.getIO)();
                io === null || io === void 0 ? void 0 : io.emit("new_appointment", resp);
                return res.status(201).json(resp);
            }
            catch (error) {
                console.log("<Appointment create controller>", error);
                return res.status(500).json(error);
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AppointmentController = AppointmentController;
