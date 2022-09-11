import { Server } from "socket.io";
import { AppointmentStatusService } from "../appointment/appointment-status";

const appointmentStatusService = new AppointmentStatusService();

let io: Server | undefined;
export function init(httpServer: any) {
    io = new Server(httpServer, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        socket.on("appointment_acceptance", (data) => {
            appointmentStatusService.accept(socket.id, data);
        });
    });
}

export function getIO() {
    if (!io) {
        throw new Error("Socket not connected");
    }

    return io;
}
