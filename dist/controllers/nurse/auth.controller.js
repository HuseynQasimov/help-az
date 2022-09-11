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
exports.AuthController = void 0;
const auth_service_1 = require("../../services/nurse/auth.service");
const authValidation_1 = require("../../utils/validations/authValidation");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthorizationService();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = authValidation_1.authValidation.validate(req.body);
                if (error) {
                    return res.status(400).json(error.message);
                }
                const resp = yield this.authService.login(req.body);
                if (resp === 404) {
                    return res.status(403).json("Email or password is incorrect");
                }
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.AuthController = AuthController;
