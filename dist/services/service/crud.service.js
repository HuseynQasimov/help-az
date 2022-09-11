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
exports.ServiceCrudService = void 0;
const service_1 = require("../../entities/service");
const postgresql_1 = require("../../integrations/postgresql");
class ServiceCrudService {
    constructor() {
        this.serviceRepo = postgresql_1.PgDataSource.getRepository(service_1.Service);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield this.serviceRepo.findOne({ where: { name: data.name } });
                if (service) {
                    return 409;
                }
                const newService = this.serviceRepo.create({ name: data.name });
                return yield this.serviceRepo.save(newService);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.serviceRepo.findOne({ where: { name } });
            }
            catch (error) {
                throw error;
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.serviceRepo.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.serviceRepo.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ServiceCrudService = ServiceCrudService;
