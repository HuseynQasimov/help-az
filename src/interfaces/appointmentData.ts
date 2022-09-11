import { AppointmentStatus } from "../entities/appointment";
import { Nurse } from "../entities/nurse";
import { Promocode } from "../entities/promocode";
import { Service } from "../entities/service";

export interface IAppointmentData {
    full_name: string;
    service: Service;
    mobile_number: string;
    address: string;
    service_date: Date;
    promo_code?: Promocode;
    nearest_nurse?: boolean;
    nurse?: Nurse;
    status?: AppointmentStatus;
}
