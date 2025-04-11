export const DEFAULT_VALIDATION_EXCEPTION_MESSAGE = 'Validation Error';
export const FILTER_VALIDATION_EXCEPTION_MESSAGE = 'Filter Validation Error';
export const SORT_VALIDATION_EXCEPTION_MESSAGE = 'Sort Validation Error';
export const PAGINATION_VALIDATION_EXCEPTION_MESSAGE =
  'Pagination Validation Error';

export const INVALID_ISO8601_FORMAT_ERROR =
  'Date must be in ISO format like YYYY-MM-DDTHH:mm:ss.sssZ';

export const DEFAULT_VALIDATION_ERRORS = {
  PATTERN_MISMATCH: (property: string, pattern: string | RegExp) =>
    `${property} must match ${pattern} regular expression`,
} as const;

export const SORT_ERRORS = {
  FIELD_IS_NOT_SORTABLE: (fields: string[]) =>
    `Sorting must be performed by one of the following fields: ${fields.join(', ')}`,
} as const;

export const FILTER_ERRORS = {
  INVALID_RULE_VALUE: (rule: string) =>
    `Invalid value provided for ${rule} rule.`,
  RULE_NOT_SUPPORTED: `The rule is not supported.`,
  PROPERTY_RULE_NOT_SUPPORTED: (rule: string, field: string, rules: string[]) =>
    `The rule ${rule} not supported for the ${field} field. Allowed rules: ${rules.join(', ')}.`,
  FIELD_IS_NOT_FILTERABLE: (fields: string[]) =>
    `Filtering must be performed by one of the following fields: ${fields.join(', ')}`,
} as const;
