import { Gender } from "src/enums/gender.enum";

export class CreateUserCommand{

    name: string;
    email: string;
    avatarUrl: string;
    password: string;
    height: number
    weight: number;
    gender: Gender;
    birthday: Date;
    about?: string;
}