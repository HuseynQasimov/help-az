import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./appointment";

type NurseStatus = "active" | "deactive";

@Entity({ name: "nurses" })
export class Nurse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    mobile_number: string;

    @Column()
    address: string;

    @Column()
    experience: string;

    @Column({ nullable: true, array: true })
    social_media: string;

    @Column({ nullable: true })
    photo: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: "enum", enum: ["active", "deactive"], default: "active" })
    status: NurseStatus;

    @OneToMany(() => Appointment, (appointment) => appointment.nurse, { nullable: true })
    @JoinColumn()
    appointments: Appointment[];
}
