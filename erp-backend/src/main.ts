import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para desenvolvimento
  app.enableCors();

  // Habilita o uso de DTOs e validações globalmente
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ERP API')
    .setDescription('Documentação da API para o sistema ERP')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona o campo de autorização para JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // A documentação estará em /api

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
