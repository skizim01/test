import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: process.env.FRONT_URL,
    credentials: true,
  });

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('APIIIIIIIIIIIII')
    .setDescription('The Calendar API description')
    .setVersion('1.0')
    .addTag('Calendar')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  const host = '127.0.0.1';
  const port = 3000;
  app.use(cookieParser());

  console.log('host:port --', host, port);

  await app.startAllMicroservices();
  await app.listen(port, host);
}

bootstrap();
