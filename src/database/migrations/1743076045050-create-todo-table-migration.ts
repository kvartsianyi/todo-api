import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { TodoStatusEnum } from '@/todo/constants';
import { createEnumTypeQuery, dropEnumTypeQuery } from '@/common/utils';

const TABLE_NAME = 'todo';
const STATUS_TYPE_NAME = 'todo_status_enum';
const STATUS_TYPE_VALUES = Object.values(TodoStatusEnum);

export class Migration1743076045050 implements MigrationInterface {
  name = 'Migration1743076045050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      createEnumTypeQuery(STATUS_TYPE_NAME, STATUS_TYPE_VALUES),
    );
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enumName: STATUS_TYPE_NAME,
            enum: STATUS_TYPE_VALUES,
            isNullable: false,
            default: `'${TodoStatusEnum.TODO}'`,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'due_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      TABLE_NAME,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(TABLE_NAME);
    const foreignKey = table?.foreignKeys?.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey(TABLE_NAME, foreignKey);
    }

    await queryRunner.dropTable(TABLE_NAME);
    await queryRunner.query(dropEnumTypeQuery(STATUS_TYPE_NAME));
  }
}
