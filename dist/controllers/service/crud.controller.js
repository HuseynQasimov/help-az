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
exports.ServiceController = void 0;
const crud_service_1 = require("../../services/service/crud.service");
const serviceValidation_1 = require("../../utils/validations/serviceValidation");
class ServiceController {
    constructor() {
        this.serviceCrudService = new crud_service_1.ServiceCrudService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = serviceValidation_1.serviceValidation.validate(req.body);
                if (error) {
                    return res.status(400).json(error.message);
                }
                const resp = yield this.serviceCrudService.create(req.body);
                if (resp === 409) {
                    return res.status(409).json("Duplicate service");
                }
                return res.status(201).json(resp);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.serviceCrudService.find());
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id) {
                    return res.status(400).json("Bad request");
                }
                return res.status(200).json(yield this.serviceCrudService.delete(req.params.id));
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
exports.ServiceController = ServiceController;
