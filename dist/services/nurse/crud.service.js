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
exports.NurseCrudService = void 0;
const nurse_1 = require("../../entities/nurse");
const postgresql_1 = require("../../integrations/postgresql");
const bcrypt_1 = __importDefault(require("bcrypt"));
class NurseCrudService {
    constructor() {
        this.nurseRepo = postgresql_1.PgDataSource.getRepository(nurse_1.Nurse);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nurse = yield this.nurseRepo.findOne({ where: { email: data.email } });
                if (nurse) {
                    return 409;
                }
                const salt = yield bcrypt_1.default.genSalt(6);
                const hashedPassword = yield bcrypt_1.default.hash(data.password, salt);
                const nurseInstance = this.nurseRepo.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
                return Object.assign(Object.assign({}, (yield this.nurseRepo.save(nurseInstance))), { password: null });
            }
            catch (error) {
                throw error;
            }
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = filter.status || "active";
                const limit = filter.limit || 10;
                const skip = filter.skip || 0;
                const nurses = yield this.nurseRepo
                    .createQueryBuilder("nurse")
                    .where("nurse.status = :status", { status })
                    .select([
                    "nurse.id",
                    "nurse.full_name",
                    "nurse.email",
                    "nurse.mobile_number",
                    "nurse.address",
                    "nurse.experience",
                    "nurse.social_media",
                    "nurse.photo",
                    "nurse.created_at",
                    "nurse.status",
                ])
                    .leftJoinAndSelect("nurse.appointments", "appointments")
                    .skip(skip)
                    .take(limit)
                    .orderBy("nurse.created_at", "ASC")
                    .getMany();
                return Object.assign(Object.assign({}, nurses), { count: nurses.length });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.NurseCrudService = NurseCrudService;
