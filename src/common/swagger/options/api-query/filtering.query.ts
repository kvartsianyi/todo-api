import { FilterRuleEnum, FilterTypeEnum } from '@/common/constants';
import { QueryFilterFieldOptions } from '@/common/interfaces';
import { ApiQueryOptions } from '@nestjs/swagger';

export const createFilterRuleQuery = (
  field: string,
  fieldOprions: QueryFilterFieldOptions,
  rule: FilterRuleEnum,
): ApiQueryOptions => ({
  name: `filter[${field}][${rule}]`,
  required: false,
  schema: {
    type: 'string',
    enum:
      fieldOprions.type === FilterTypeEnum.ENUM ? fieldOprions.enum : undefined,
  },
  description: `Filter by "${field}" with rule "${rule}"`,
});
