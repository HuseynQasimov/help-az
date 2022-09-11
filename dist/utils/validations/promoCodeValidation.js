"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoCodeValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.promoCodeValidation = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    code: joi_1.default.string().length(10).required(),
    start_date: joi_1.default.date().required(),
    end_date: joi_1.default.date().required(),
});
