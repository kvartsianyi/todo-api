import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { getPrettyClassValidatorErrors } from '../utils';
import { DEFAULT_VALIDATION_EXCEPTION_MESSAGE } from '../constants';

/**
 * This exception extends NestJS's `BadRequestException` and supports
 * multiple overloads for flexibility:
 *
 * - Pass a list of errors only
 * - Pass a custom message only
 * - Pass both message and errors
 */
export class ValidationException extends BadRequestException {
  /**
   * Creates a `ValidationException` with a custom message and no detailed errors.
   *
   * @param message - A custom error message describing the validation failure.
   */
  constructor(message: string);

  /**
   * Creates a `ValidationException` with a list of validation errors.
   *
   * @param errors - An array of validation errors for specific fields.
   */
  constructor(errors: ValidationError[]);

  /**
   * Creates a `ValidationException` with a custom message and a list of validation errors.
   *
   * @param message - A custom error message describing the validation failure.
   * @param errors - An array of validation errors for specific fields.
   */
  constructor(message: string, errors: ValidationError[]);
  constructor(
    messageOrErrors: string | ValidationError[],
    maybeErrors?: ValidationError[],
  ) {
    if (typeof messageOrErrors === 'string') {
      super({
        message: messageOrErrors,
        errors: getPrettyClassValidatorErrors(maybeErrors || []),
      });
    } else {
      super({
        message: DEFAULT_VALIDATION_EXCEPTION_MESSAGE,
        errors: getPrettyClassValidatorErrors(messageOrErrors),
      });
    }
  }
}
