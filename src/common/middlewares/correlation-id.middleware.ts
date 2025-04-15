import { randomUUID } from 'node:crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { CORRELATION_ID_HEADER } from '../constants';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.headers[CORRELATION_ID_HEADER] ?? randomUUID();

    req.headers[CORRELATION_ID_HEADER] = id;
    res.set(CORRELATION_ID_HEADER, id);

    next();
  }
}
