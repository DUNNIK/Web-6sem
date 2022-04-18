import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import * as session from 'express-session';
import flash = require('connect-flash');
import * as exphbs from 'express-handlebars';
import * as passport from 'passport';
import {LoggingInterceptor} from "./logging.interceptor";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {UsersModule} from "./users/users.module";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  const viewsPath = join(__dirname, '../views');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'base' }));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  app.use(
      session({
        secret: 'secretKey',
        resave: false,
        saveUninitialized: false,
      }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());


    const config = new DocumentBuilder()
        .setTitle('Profile')
        .setDescription('authentication application')
        .setVersion('1.0')
        .addTag('profile')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config, {
      include: [AppModule, UsersModule]
    });
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();