import { Appointment } from "../../entities/appointment";
import { Nurse } from "../../entities/nurse";
import { PgDataSource } from "../../integrations/postgresql";
import { getIO } from "../socket/socket";

export class AppointmentStatusService {
    private appointmentRepo = PgDataSource.getRepository(Appointment);
    private nurseRepo = PgDataSource.getRepository(Nurse);

    async accept(socketId: any, data: any) {
        const io = getIO();

        try {
            const appointment = await this.appointmentRepo.findOne({
                where: { id: data.appointment.id },
            });

            const nurse = await this.nurseRepo.findOne({ where: { id: data.nurse.id } });

            if (!appointment || !nurse) {
                io.to(socketId).emit("acceptance_result", {
                    success: false,
                    data: "Something went wrong",
                });
                return;
            }

            appointment.nurse = nurse;

            nurse.appointments = [appointment];

            await this.appointmentRepo.save(appointment);
            await this.nurseRepo.save(nurse);

            io.to(socketId).emit("acceptance_result", { success: true, data: "Success" });
        } catch (error) {
            io.to(socketId).emit("acceptance_result", {
                success: false,
                data: "Something went wrong",
            });
            console.log(error);
        }
    }
}
