import { Gender } from "src/enums/gender.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, IsDate, Length, Matches } from 'class-validator';
import { Type } from "class-transformer";

export class CreateUserDto {

    @IsNotEmpty({ message: 'O nome não pode estar vazio' })
    @IsString({ message: 'O nome deve ser um texto' })
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
        message: 'O nome deve conter apenas letras, espaços e acentos ortográficos',
    })
    name: string;

    @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @IsOptional()
    @IsString()
    avatarUrl: string;

    @IsNotEmpty({ message: 'A senha não pode estar vazia' })
    @IsString()
    @Length(8, 20, { message: 'A senha deve ter entre 8 e 20 caracteres' })
    password: string;

    @IsNotEmpty({ message: 'A altura não pode estar vazia' })
    @IsNumber({}, { message: 'A altura deve ser um número' })
    height: number;

    @IsNotEmpty({ message: 'O peso não pode estar vazio' })
    @IsNumber({}, { message: 'O peso deve ser um número' })
    weight: number;

    @IsNotEmpty({ message: 'O gênero não pode estar vazio' })
    @IsEnum(Gender, { message: 'O gênero deve ser um valor válido' })
    gender: Gender;

    @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia' })
    @Type(() => Date)
    @IsDate({ message: 'A data de nascimento deve ser uma data válida' })
    birthday: Date;

    @IsOptional()
    @IsString()
    about?: string;
}
