import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) { }

  async verifyOrCreateUser(user: any) {

    const existingUser = await this.userService.findByGoogleId(user.googleId);

    if (existingUser) {

      return existingUser;
    }

    const newUser = await this.userService.create({
      googleId: user.googleId,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    });

    return this.userService.findByGoogleId(newUser.googleId);
  }
}
