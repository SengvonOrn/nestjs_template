import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type MyResponeObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  respone: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const respone = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const MyResponeObject: MyResponeObject = {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: request.url,
      respone: '',
    };
    if (exception instanceof HttpException) {
      MyResponeObject.statusCode = exception.getStatus();
      MyResponeObject.respone = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      MyResponeObject.statusCode = 422;
      MyResponeObject.respone = exception.message.replaceAll(/\n/g, '');
    } else {
      MyResponeObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      MyResponeObject.respone = 'Internal Server Error';
    }
    respone.status(MyResponeObject.statusCode).json(MyResponeObject);
    this.logger.error(MyResponeObject.respone, AllExceptionsFilter.name);
    super.catch(exception, host);
  }
}
