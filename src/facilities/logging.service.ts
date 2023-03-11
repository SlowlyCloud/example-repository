import { Injectable } from "@nestjs/common";
import { WinstonLogger } from "nest-winston";
import * as winston from 'winston';


@Injectable()
export class Logger extends WinstonLogger {
    constructor() {
        super(winston.createLogger({
            levels: {
                silly: winston.config.cli.levels.silly,
                debug: winston.config.cli.levels.debug,
                info: winston.config.cli.levels.info,
                warn: winston.config.cli.levels.warn,
                error: winston.config.cli.levels.error,
            },
            silent: false,
            level: 'info',
            defaultMeta: { app: 'example-repository' },
            exitOnError: false,
            transports: [new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    // winston.format.colorize(),
                    winston.format.json(),
                    // winston.format.simple(),
                    winston.format.metadata(),
                    winston.format.errors({stack: true})
                )
            })],
            handleExceptions: true,
            handleRejections: true,
        }))
    }
}