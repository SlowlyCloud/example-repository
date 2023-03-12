import { Inject, Injectable } from "@nestjs/common";
import { WinstonLogger } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class Logger extends WinstonLogger {
    constructor(private readonly config: ConfigService) {
        let winstonFormat = [
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
        ]

        switch (config.get<string>('NODE_ENV')) {
            case 'local':
                winstonFormat.push(...[
                    winston.format.colorize(),
                    winston.format.simple(),
                    winston.format.ms(),
                ])
                break;
                
            default:
                winstonFormat.push(...[
                    winston.format.json(),
                ])
                break;
        }

        super(winston.createLogger({
            levels: {
                verbose: winston.config.cli.levels.verbose,
                debug: winston.config.cli.levels.debug,
                info: winston.config.cli.levels.info,
                warn: winston.config.cli.levels.warn,
                error: winston.config.cli.levels.error,
            },
            silent: false,
            level: config.get<string>('LOG_LEVEL'),
            defaultMeta: { app_id: config.get<string>('APP_ID') },
            exitOnError: false,
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(...winstonFormat)
                })
            ],
            handleExceptions: true,
            handleRejections: true,
        }))
    }
}