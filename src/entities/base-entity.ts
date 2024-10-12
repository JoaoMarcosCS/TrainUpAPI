import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('basic-entity')
export abstract class BasicEntity {
    
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @CreateDateColumn({
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp with time zone", 
        default: () => 'CURRENT_TIMESTAMP'
    })
    updated_at: Date

}