"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const nurse_1 = require("./nurse");
const promocode_1 = require("./promocode");
const service_1 = require("./service");
let Appointment = class Appointment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_1.Service),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", service_1.Service)
], Appointment.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "mobile_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Appointment.prototype, "service_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => promocode_1.Promocode, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", promocode_1.Promocode)
], Appointment.prototype, "promo_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "nearest_nurse", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nurse_1.Nurse, (nurse) => nurse.appointments, { nullable: true }),
    __metadata("design:type", nurse_1.Nurse)
], Appointment.prototype, "nurse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ["waiting", "inProgress", "completed"], default: "waiting" }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Appointment.prototype, "created_at", void 0);
Appointment = __decorate([
    (0, typeorm_1.Entity)({ name: "appointments" })
], Appointment);
exports.Appointment = Appointment;
