import { Table, Model, Column } from 'sequelize-typescript';

@Table({
  tableName: 'event',
})
export class Event extends Model {
  @Column({ primaryKey: true, autoIncrement: true, unique: true })
  id!: number;

  @Column
  title: string;

  @Column
  start: Date;

  @Column
  duration: number;
}
