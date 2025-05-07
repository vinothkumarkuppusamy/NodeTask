import { Request, Response, NextFunction } from 'express';
import { STATUSCODE } from '../utils/statuscode';
import { handleResponse } from '../utils/response.util';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = err.statusCode || STATUSCODE.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';

  if (Array.isArray(err.errors) && err.errors[0]?.msg && err.errors[0]?.param) {
    statusCode = STATUSCODE.BAD_REQUEST;
    res.status(statusCode).json(handleResponse("Validation Error",
      {
      message: 'Validation Error',
      errors: err.errors.map((e: any) => ({
        field: e.param,
        message: e.msg,
      })),
    }
  ));
    return;
  }

  if (err instanceof Error && 'statusCode' in err) {
    res.status(statusCode).json(handleResponse("Internal Server Error", message));
    return;
  }

  console.error('Unexpected Error:', err);
  res.status(statusCode).json({ message: 'Something went wrong' });
};
