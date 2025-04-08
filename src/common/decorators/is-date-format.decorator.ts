import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { DEFAULT_VALIDATION_ERRORS } from '../constants';

const { PATTERN_MISMATCH } = DEFAULT_VALIDATION_ERRORS;

export function IsDateFormat(
  pattern: RegExp,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    Transform(({ value }) => {
      if (typeof value === 'string' && pattern.test(value)) {
        return new Date(value);
      }
      return value;
    })(object, propertyName);

    registerDecorator({
      name: 'IsDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value instanceof Date;
        },
        defaultMessage(_args: ValidationArguments) {
          return PATTERN_MISMATCH(_args.property, pattern);
        },
      },
    });
  };
}
