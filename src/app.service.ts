import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentService } from './environment/environment.service';

@Injectable()
export class AppService {

  @Inject()
  private readonly env: EnvironmentService;

  getHello(): string {
    return 'Hello World!' + this.env.APP_PORT;
  }
}
