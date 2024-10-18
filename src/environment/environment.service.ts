import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvironmentService {

    @Inject()
    private readonly config: ConfigService;

    get DATABASE_CONNECTION_STRING(): string {
        return this.config.get("DATABASE_CONNECTION_STRING")
    }

    get DATABASE_PASSWORD(): string {
        return this.config.get("DATABASE_PASSWORD")
    }

    get APP_PORT(): number {
        return this.config.get("APP_PORT")
    }
    get GOOGLE_CLIENT_ID(): string {
        return this.config.get("GOOGLE_CLIENT_ID")
    }

    get GOOGLE_CLIENT_SECRET(): string {
        return this.config.get("GOOGLE_CLIENT_SECRET")
    }

    get URL_CALLBACK_PROD(): string {
        return this.config.get("URL_CALLBACK_PROD")
    }

    get URL_CALLBACK_LOCAL(): string {
        return this.config.get("URL_CALLBACK_LOCAL")
    }

    get URL_CALLBACK_CODESPACE(): string {
        return this.config.get("URL_CALLBACK_CODESPACE")
    }

    get JWT_EXPIRES(): string {
        return this.config.get("JWT_EXPIRES")
    }

    get JWT_SECRET(): string {
        return this.config.get("JWT_SECRET")
    }


}