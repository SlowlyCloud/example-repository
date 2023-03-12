import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from './facilities/facilities.logger';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';

@Module({
  imports: [ConfigModule.forRoot({
    cache: true,
    envFilePath: ['.env/.env.local', '.env/.env.dev', '.env/.env.prod'],
    validationSchema: joi.object({
      'NODE_ENV': joi.string()
        .valid('local', 'development', 'production')
        .default('local'),
      'APP_ID': joi.string()
        .required(),
      'PORT': joi.number()
        .default(3000),
      'LOG_LEVEL': joi.string()
        .valid('info', 'debug', 'error', 'warn', 'verbose')
        .default('info'),
      'BASE_PATH': joi.string()
        .uri({ allowRelative: true })
        .default('/'),
    })
  })],
  controllers: [AppController],
  providers: [AppService, ConfigService, Logger],
})
export class AppModule { }
