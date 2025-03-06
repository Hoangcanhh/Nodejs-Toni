import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add Swagger documentation
  const options = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('The Books API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // Start the server
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';
  await app.listen(PORT, HOST);
}
bootstrap();
