import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    @Inject()
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { googleId } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    
    return this.userRepository.save(user);
  }
}
