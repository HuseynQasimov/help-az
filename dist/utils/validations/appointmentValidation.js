"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.appointmentValidation = joi_1.default.object().keys({
    full_name: joi_1.default.string().min(6).max(64).required(),
    service: joi_1.default.string().required(),
    mobile_number: joi_1.default.string().min(10).max(15).required(),
    address: joi_1.default.string().min(6).max(124).required(),
    service_date: joi_1.default.date().required(),
    promo_code: joi_1.default.string().optional(),
    nearest_nurse: joi_1.default.boolean().optional(),
});
