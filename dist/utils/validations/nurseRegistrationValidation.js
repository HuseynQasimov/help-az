"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nurseRegistrationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.nurseRegistrationValidation = joi_1.default.object().keys({
    full_name: joi_1.default.string().min(6).max(64).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
    mobile_number: joi_1.default.string().min(10).max(15).required(),
    address: joi_1.default.string().min(6).max(124).required(),
    experience: joi_1.default.string().min(4).max(10).required(),
    social_media: joi_1.default.array().items(joi_1.default.string()).optional(),
    photo: joi_1.default.string().optional(),
});
