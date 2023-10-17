import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
        secure: false,
      },
    }),
  );

  app.enableCors({
    origin: process.env.FRONT_URL,

    // methods: ['GET', 'POST', 'PATCH'],

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
  SwaggerModule.setup('api#', app, document);
  app.use(passport.initialize());
  app.use(passport.session());
  const host = '127.0.0.1';
  const port = 3000;

  console.log('host:port --', host, port);

  await app.startAllMicroservices();
  await app.listen(port, host);
}

bootstrap();
