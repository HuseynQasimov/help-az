import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "evaluations" })
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    description: string;

    @Column()
    score: number;

    @CreateDateColumn()
    created_at: Date;
}
