import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

import { AppEnvironmentEnum, MorganFormatEnum } from '../constants';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    morgan(
      this.configService.get('NODE_ENV') === AppEnvironmentEnum.PRODUCTION
        ? MorganFormatEnum.SHORT
        : MorganFormatEnum.DEV,
    )(req, res, next);
  }
}
