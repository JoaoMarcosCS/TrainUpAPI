import { Column, Entity } from "typeorm";
import { BasicEntity } from "./base-entity";
import { Gender } from "src/enums/gender.enum";

@Entity('user')
export class User extends BasicEntity {

    @Column({type: "text"})
    name: string;

    @Column({type: "text", unique: true})
    email: string;

    @Column({type: "text"})
    password: string;

    @Column({type: "decimal"})
    height: number

    @Column({type: "decimal"})
    weight: number;

    @Column({type: "enum", enum: Gender})
    gender: Gender;

    @Column({type: "date"})
    birthday: Date;

    @Column({type: "text", nullable: true, default: "Nada escrito ainda :("})
    about?: string;
}