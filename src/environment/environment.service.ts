import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvironmentService {

    @Inject()
    private readonly config: ConfigService;

    get DATABASE_CONNECTION_STRING():string {
        return this.config.get("DATABASE_CONNECTION_STRING")
    }

    get DATABASE_PASSWORD():string {
        return this.config.get("DATABASE_PASSWORD")
    }

    get APP_PORT():number {
        return this.config.get("APP_PORT")
    }


}