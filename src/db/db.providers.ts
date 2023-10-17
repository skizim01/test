import { Sequelize } from 'sequelize-typescript';
import * as models from './models';
import { SEQUELIZE } from '../common/constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize('postgres', 'stepankizim', '1111', {
        dialect: 'postgres',
        host: 'localhost',
      });
      sequelize.addModels(Object.values(models));
      await sequelize
        .sync()
        .then(() => {
          console.log('Table created successfully.');
        })
        .catch((error) => {
          console.error('Error creating table:', error);
        });
      return sequelize;
    },
  },
];
