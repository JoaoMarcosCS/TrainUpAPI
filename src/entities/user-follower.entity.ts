import { Entity, ManyToOne } from "typeorm";
import { BasicEntity } from "./base-entity";
import { User } from "./user.entity";

@Entity("user-follower")
export class UserFollower extends BasicEntity{
    
    @ManyToOne(() => User, { onDelete: "CASCADE"})
    follower: User;

    @ManyToOne(() => User, { onDelete: "CASCADE"})
    following: User;
}