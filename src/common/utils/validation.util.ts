import { ValidationError } from 'class-validator';
import { PropertyValidationError } from '../interfaces';

export const getPrettyClassValidatorErrors = (
  validationErrors: ValidationError[],
  parentProperty = '',
): PropertyValidationError[] => {
  const errors: PropertyValidationError[] = [];

  const getValidationErrorsRecursively = (
    validationErrors: ValidationError[],
    parentProperty = '',
  ) => {
    for (const error of validationErrors) {
      const propertyPath = parentProperty
        ? `${parentProperty}.${error.property}`
        : error.property;

      if (error.constraints) {
        errors.push({
          property: propertyPath,
          errors: Object.values(error.constraints),
        });
      }

      if (error.children?.length) {
        getValidationErrorsRecursively(error.children, propertyPath);
      }
    }
  };

  getValidationErrorsRecursively(validationErrors, parentProperty);

  return errors;
};
