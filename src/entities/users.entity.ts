import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({type: "text"})
    name: string;

}