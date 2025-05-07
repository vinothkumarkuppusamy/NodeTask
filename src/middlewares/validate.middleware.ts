import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { STATUSCODE } from '../utils/statuscode';
import { handleResponse } from '../utils/response.util';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array({ onlyFirstError: true }).map((err: ValidationError) => ({
      field: err.type,
      message: err.msg,
    }));

    res.status(STATUSCODE.BAD_REQUEST).json(handleResponse(
      'Validation Error occured',
    ));
    return;
  }

  next();
};
