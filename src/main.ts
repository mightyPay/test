import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Define basic authentication middleware using environment variables
  app.use(
    ['/docs', '/docs/json'], // Corrected the route paths
    basicAuth({
      challenge: true,
      users: {
        admin: 'password',
        // [process.env.SWAGGER_ADMIN]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('The Products API description')
    .setVersion('1.0')
    .addTag('Products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
