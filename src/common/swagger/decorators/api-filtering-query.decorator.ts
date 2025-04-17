import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { QueryFilterFieldOptions } from '@/common/interfaces';
import { ALLOWED_FILTER_RULES_MAP } from '@/common/constants';
import { createFilterRuleQuery } from '../options';

export function ApiFilterQuery(
  fields: Record<string, QueryFilterFieldOptions>,
) {
  const decorators = Object.entries(fields).flatMap(([field, options]) => {
    const rules = options.rules ?? ALLOWED_FILTER_RULES_MAP[options.type];

    return rules.map((rule) =>
      ApiQuery(createFilterRuleQuery(field, options, rule)),
    );
  });

  return applyDecorators(...decorators);
}
