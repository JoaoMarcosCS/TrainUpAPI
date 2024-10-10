import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto); // Cria uma instância do usuário
        return await this.userRepository.save(user); // Salva o usuário no banco
      }
    
      async findAll(): Promise<User[]> {
        return await this.userRepository.find();
      }
}
