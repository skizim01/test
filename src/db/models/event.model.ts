import {
  Table,
  Model,
  Column,
  PrimaryKey,
  HasOne,
  HasMany,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'event',
})
export class Event extends Model {
  @Column({ primaryKey: true })
  id!: string;

  @Column
  title: string;

  @Column
  start: Date;

  @Column
  end: Date;

  @BelongsTo(() => User, {
    targetKey: 'email',
    keyType: DataType.STRING,
    foreignKey: 'email',
  })
  user: User;
}
