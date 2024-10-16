import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BasicEntity } from "./base-entity";
import { Visibility } from "../enums/visibility.enum";
import { User } from "./user.entity";
import { Exercise } from "./exercise.entity";

@Entity('workout')
export class Workout extends BasicEntity {

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "enum", enum: Visibility, default: Visibility.PUBLIC })
    visibility: Visibility

    @Column({ type: "boolean", default: false })
    is_saved: boolean;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    user: User;

    @OneToMany(
        () => Exercise,
        (exercise) => exercise.workout,
        { eager: true }
    )
    exercises: Exercise[];



}