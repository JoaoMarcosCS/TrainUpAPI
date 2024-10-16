import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

  async validateOAuthUser(user: CreateUserDto) {
    
    const existingUser = await this.usersService.findByGoogleId(user.googleId);

    if (existingUser) {

      return existingUser;
    }

    const newUser = await this.usersService.create({
      googleId: user.googleId,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    });

    return this.usersService.findByGoogleId(newUser.googleId);
  }
}
