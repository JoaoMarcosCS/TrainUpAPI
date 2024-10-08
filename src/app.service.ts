import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentService } from './environment/environment.service';

@Injectable()
export class AppService {

  @Inject()
  private readonly environment: EnvironmentService;

  getHello(): string {
    return 'Hello World!' + this.environment.APP_PORT;
  }
}
