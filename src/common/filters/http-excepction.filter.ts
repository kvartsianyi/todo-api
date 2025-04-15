import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

import {
  CORRELATION_ID_HEADER,
  INTERNAL_SERVER_EXCEPTION_MESSAGE,
} from '../constants';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const correlationId = res.get(CORRELATION_ID_HEADER);
    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException
      ? exception.getResponse()
      : INTERNAL_SERVER_EXCEPTION_MESSAGE;

    const isCriticalError =
      (status as HttpStatus) >= HttpStatus.INTERNAL_SERVER_ERROR;

    if (isCriticalError) {
      this.logger.error(
        `(${correlationId}) ${req.method} ${req.url} - ${status}\nError: ${exception.message || ''}`,
        exception.stack || '',
      );
    }

    res.status(status).json({
      statusCode: status,
      ...(typeof message === 'string' ? { message } : message),
    });
  }
}
