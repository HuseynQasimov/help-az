import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Nurse } from "./nurse";
import { Promocode } from "./promocode";
import { Service } from "./service";

export type AppointmentStatus = "waiting" | "inProgress" | "completed";

@Entity({ name: "appointments" })
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @ManyToOne(() => Service)
    @JoinColumn()
    service: Service;

    @Column()
    mobile_number: string;

    @Column()
    address: string;

    @Column()
    service_date: Date;

    @ManyToOne(() => Promocode, { nullable: true })
    @JoinColumn()
    promo_code: Promocode;

    @Column({ default: false })
    nearest_nurse: boolean;

    @ManyToOne(() => Nurse, (nurse) => nurse.appointments, { nullable: true })
    nurse: Nurse;

    @Column({ type: "enum", enum: ["waiting", "inProgress", "completed"], default: "waiting" })
    status: AppointmentStatus;

    @CreateDateColumn()
    created_at: Date;
}
