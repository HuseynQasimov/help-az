import { Appointment } from "../../entities/appointment";
import { PgDataSource } from "../../integrations/postgresql";
import { IAppointmentData } from "../../interfaces/appointmentData";

export class AppointmentCrudService {
    private appointmentRepo = PgDataSource.getRepository(Appointment);

    create(data: IAppointmentData) {
        try {
            const newAppointment = this.appointmentRepo.create(data);
            return this.appointmentRepo.save(newAppointment);
        } catch (error) {
            throw error;
        }
    }

    async update(data?: IAppointmentData) {
        try {
        } catch (error) {
            throw error;
        }
    }
}
