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
exports.PromoCodeCrudService = void 0;
const promocode_1 = require("../../entities/promocode");
const postgresql_1 = require("../../integrations/postgresql");
class PromoCodeCrudService {
    constructor() {
        this.promoCodeRepo = postgresql_1.PgDataSource.getRepository(promocode_1.Promocode);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoCode = yield this.promoCodeRepo.findOne({ where: { code: data.code } });
                if (promoCode) {
                    return 409;
                }
                const newPromoCode = this.promoCodeRepo.create(data);
                return yield this.promoCodeRepo.save(newPromoCode);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.promoCodeRepo.findOne({ where: { code } });
            }
            catch (error) {
                throw error;
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.promoCodeRepo.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.promoCodeRepo.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.PromoCodeCrudService = PromoCodeCrudService;
