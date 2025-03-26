import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  readonly updatedAt: Date;
}
