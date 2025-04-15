import { FilterRuleEnum, FilterTypeEnum } from '../constants';

export type QueryFilterValueType =
  | string
  | number
  | boolean
  | Date
  | number[]
  | string[];

export interface QueryFilter {
  property: string;
  rule: FilterRuleEnum;
  value: QueryFilterValueType;
}

type BaseFilterField = {
  rules?: FilterRuleEnum[];
};

export type StringFilterField = BaseFilterField & {
  type: FilterTypeEnum.STRING;
};

export type NumberFilterField = BaseFilterField & {
  type: FilterTypeEnum.NUMBER;
};

export type BooleanFilterField = BaseFilterField & {
  type: FilterTypeEnum.BOOLEAN;
};

export type DateFilterField = BaseFilterField & {
  type: FilterTypeEnum.DATE;
};

export type EnumFilterField = BaseFilterField & {
  type: FilterTypeEnum.ENUM;
  enum: string[];
};

export type QueryFilterFieldOptions =
  | StringFilterField
  | NumberFilterField
  | BooleanFilterField
  | DateFilterField
  | EnumFilterField;
