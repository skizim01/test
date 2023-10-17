import { EVENT_REPOSITORY } from '../../common/constants';
import { Event } from '../models';

export const eventRepository = [
  {
    provide: EVENT_REPOSITORY,
    useValue: Event,
  },
];
