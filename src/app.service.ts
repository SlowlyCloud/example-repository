import { Injectable } from '@nestjs/common';
import { Logger } from './facilities/logging.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) { }

  getHello(): string {
    this.logger.debug({ where: "AppService" }, 'hello is called');

    this.logger.log({ where: "AppService" }, 'hello is called');

    this.logger.error({
      something: 'happened',
      obj: {
        anything: 'happened'
      }
    });


    return 'Hello World!';
  }
}
