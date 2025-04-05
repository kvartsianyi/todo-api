export const SORT_ERRORS = {
  FIELD_IS_NOT_SORTABLE: (fields: string[]) =>
    `Sorting must be performed by one of the following fields: ${fields.join(', ')}`,
} as const;

export const FILTER_ERRORS = {
  INVALID_RULE_VALUE: 'Invalid value provided for the rule.',
  RULE_NOT_SUPPORTED: `The rule is not supported.`,
  PROPERTY_RULE_NOT_SUPPORTED: (rules: string[]) =>
    `The rule is not supported for the field. Allowed rules: ${rules.join(', ')}.`,
} as const;
