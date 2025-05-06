import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

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

    res.status(400).json({
      message: 'Validation Error',
      errors: formattedErrors,
    });
    return;
  }

  next();
};
