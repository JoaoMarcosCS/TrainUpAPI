import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('TrainUp API Doc')
    .setDescription('Essa é a documentação da API do projeto TrainUp feita')
    .setVersion('1.0')
    .addTag('examples') // Adicione tags conforme necessário
    .build();

