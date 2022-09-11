import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "promocodes" })
export class Promocode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @CreateDateColumn()
    created_at: Date;
}
