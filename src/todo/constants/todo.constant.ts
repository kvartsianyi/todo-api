import {
  FILTER_RULES_BY_TYPES,
  FilterRuleEnum,
  FilterTypeEnum,
} from '@/common/constants';

export enum TodoStatusEnum {
  TODO = 'todo',
  COMPLETED = 'completed',
}

export const TODO_SORTABLE_FIELDS: string[] = ['title'] as const;
export const TODO_FILTERABLE_FIELDS: Record<string, FilterRuleEnum[]> = {
  id: [
    ...FILTER_RULES_BY_TYPES[FilterTypeEnum.NUMBER],
    ...FILTER_RULES_BY_TYPES[FilterTypeEnum.ARRAY],
  ],
  title: FILTER_RULES_BY_TYPES[FilterTypeEnum.STRING],
  createdAt: FILTER_RULES_BY_TYPES[FilterTypeEnum.DATE],
} as const;

export const TITLE_MIN_LENGTH = 3;
export const TITLE_MAX_LENGTH = 50;

export const DESCRIPTION_MIN_LENGTH = 3;
export const DESCRIPTION_MAX_LENGTH = 100;
