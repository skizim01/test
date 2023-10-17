import { User } from '../models';
import { USER_REPOSITORY } from '../../common/constants';

export const userRepository = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
