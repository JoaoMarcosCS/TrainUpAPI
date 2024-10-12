import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExerciseBase } from "./exercise-base.entity";
import { Workout } from "./workout.entity";

@Entity('exercise')
export class Exercise {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "int", default: 0 })
    sets: number; // numero de séries

    @Column({ type: "int", default: 0 })
    repetitios: number;// numero de repetições

    @Column({type: "decimal", nullable: true, default: 1})
    weight?: number;

    @Column({type: "interval", nullable: true})
    rest_time: Date

    @ManyToOne(() => ExerciseBase, { onDelete: "SET NULL" })
    exercise: ExerciseBase;

    @ManyToOne(() => Workout, (workout) => workout.exercises,{ onDelete: "SET NULL"})
    workout: Workout;
}