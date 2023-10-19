import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EVENT_REPOSITORY } from '../common/constants';
import { Event } from '../db';
import { Op } from 'sequelize';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Inject(EVENT_REPOSITORY)
  private eventRepository: typeof Event;

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const count = await this.eventRepository.destroy({
      where: {
        end: {
          [Op.lt]: new Date(),
        },
      },
    });
    this.logger.log({ count });
  }
}
