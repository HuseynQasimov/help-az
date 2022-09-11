"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.init = void 0;
const socket_io_1 = require("socket.io");
const appointment_status_1 = require("../appointment/appointment-status");
const appointmentStatusService = new appointment_status_1.AppointmentStatusService();
let io;
function init(httpServer) {
    io = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
    io.on("connection", (socket) => {
        socket.on("appointment_acceptance", (data) => {
            appointmentStatusService.accept(socket.id, data);
        });
    });
}
exports.init = init;
function getIO() {
    if (!io) {
        throw new Error("Socket not connected");
    }
    return io;
}
exports.getIO = getIO;
