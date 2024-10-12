import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('exercise-base')
export class ExerciseBase{
    
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({type: "text"})
    description: string;

    @Column({type:"text"})
    title: string;
}