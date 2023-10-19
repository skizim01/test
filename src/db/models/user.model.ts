import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Event } from './event.model';
import { NonAttribute } from 'sequelize';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, unique: true })
  id!: number;

  @Column({ unique: true })
  email: string;

  @Column
  name: string;

  @Column
  locale: string;
  @Column
  refresh_token: string;

  @HasMany(() => Event, {
    sourceKey: 'email',
    keyType: DataType.STRING,
    foreignKey: 'email',
  })
  events: Event[];
}
