import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ERROR_CODE } from '../../constant';
import { Response } from '../../types/response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = (exception.getResponse() as Record<string, any>)?.message || exception?.message || '请求失败';
    Logger.log('错误提示==', message);
    const errorResponse: Response<null> = {
      code: ERROR_CODE,
      message: message,
      data: null,
    };
    console.log('exception.getStatus()====', exception.getStatus());
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
