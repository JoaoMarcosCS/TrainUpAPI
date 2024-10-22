import { Exclude, Expose } from "class-transformer";

@Exclude()
export class FindUserByEmailDto{
   
    @Expose()
    id: string;

    @Expose()
    email: string;

}