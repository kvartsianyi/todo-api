export const createEnumTypeQuery = (
  typeName: string,
  values: string[],
): string => {
  const formattedValues = values.map((value) => `'${value}'`).join(', ');

  return `CREATE TYPE "${typeName}" AS ENUM (${formattedValues})`;
};

export const dropEnumTypeQuery = (typeName: string): string => {
  return `DROP TYPE "${typeName}"`;
};
