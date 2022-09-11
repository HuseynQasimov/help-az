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
exports.AppointmentStatusService = void 0;
const appointment_1 = require("../../entities/appointment");
const nurse_1 = require("../../entities/nurse");
const postgresql_1 = require("../../integrations/postgresql");
const socket_1 = require("../socket/socket");
class AppointmentStatusService {
    constructor() {
        this.appointmentRepo = postgresql_1.PgDataSource.getRepository(appointment_1.Appointment);
        this.nurseRepo = postgresql_1.PgDataSource.getRepository(nurse_1.Nurse);
    }
    accept(socketId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = (0, socket_1.getIO)();
            try {
                const appointment = yield this.appointmentRepo.findOne({
                    where: { id: data.appointment.id },
                });
                const nurse = yield this.nurseRepo.findOne({ where: { id: data.nurse.id } });
                if (!appointment || !nurse) {
                    io.to(socketId).emit("acceptance_result", {
                        success: false,
                        data: "Something went wrong",
                    });
                    return;
                }
                appointment.nurse = nurse;
                nurse.appointments = [appointment];
                yield this.appointmentRepo.save(appointment);
                yield this.nurseRepo.save(nurse);
                io.to(socketId).emit("acceptance_result", { success: true, data: "Success" });
            }
            catch (error) {
                io.to(socketId).emit("acceptance_result", {
                    success: false,
                    data: "Something went wrong",
                });
                console.log(error);
            }
        });
    }
}
exports.AppointmentStatusService = AppointmentStatusService;
