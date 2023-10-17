import { Table, Model, Column } from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, unique: true })
  id!: number;

  @Column
  email: string;

  @Column
  displayName: string;

  @Column
  refreshToken: string;
}
