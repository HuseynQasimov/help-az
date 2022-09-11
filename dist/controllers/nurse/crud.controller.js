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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NurseCrudController = void 0;
const crud_service_1 = require("../../services/nurse/crud.service");
const nurseRegistrationValidation_1 = require("../../utils/validations/nurseRegistrationValidation");
const fs_1 = __importDefault(require("fs"));
class NurseCrudController {
    constructor() {
        this.nurseCrudServcie = new crud_service_1.NurseCrudService();
    }
    registerNurse(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = Object.assign(req.body, { photo: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
                const { error } = nurseRegistrationValidation_1.nurseRegistrationValidation.validate(body);
                if (error) {
                    if ((_b = req.file) === null || _b === void 0 ? void 0 : _b.path) {
                        fs_1.default.unlink(req.file.path, () => { });
                    }
                    return res.status(400).json(error.message);
                }
                const resp = yield this.nurseCrudServcie.create(body);
                if (resp === 409) {
                    return res.status(409).json("Email already registered");
                }
                return res.status(201).json(resp);
            }
            catch (error) {
                if ((_c = req.file) === null || _c === void 0 ? void 0 : _c.path) {
                    fs_1.default.unlink(req.file.path, () => { });
                }
                res.status(500).json(error);
            }
        });
    }
    getNurses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.nurseCrudServcie.find(req.query);
                return res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.NurseCrudController = NurseCrudController;
