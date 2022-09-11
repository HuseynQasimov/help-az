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
exports.AuthorizationService = void 0;
const nurse_1 = require("../../entities/nurse");
const postgresql_1 = require("../../integrations/postgresql");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthorizationService {
    constructor() {
        this.nurseRepo = postgresql_1.PgDataSource.getRepository(nurse_1.Nurse);
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nurse = yield this.nurseRepo.findOne({ where: { email: data.email } });
                if (!nurse || nurse.status === "deactive") {
                    return 404;
                }
                const passwordComparison = yield bcrypt_1.default.compare(data.password, nurse.password);
                if (!passwordComparison) {
                    return 404;
                }
                const token = jsonwebtoken_1.default.sign(nurse.email, config_1.default.get("secret-key"));
                return Object.assign(Object.assign({}, nurse), { password: null, token });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AuthorizationService = AuthorizationService;
