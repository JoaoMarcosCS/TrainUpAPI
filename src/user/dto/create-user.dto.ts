import { Gender } from "src/enums/gender.enum"

export class CreateUserDto {
  googleId: string;
  email: string;
  name: string;
  avatarUrl: string;
  password: string; 
  height: number; 
  weight: number; 
  gender: Gender; 
  birthday: Date; 
  about: string;
  }