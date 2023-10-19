import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthenticationModule } from './authentication/authentication.module';
import { CalendarModule } from './calendar/calendar.module';
import { DatabaseModule } from './db/db.module';
import { TasksService } from './tasks/tasks.service';
import { eventRepository } from './db/repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthenticationModule,
    CalendarModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [TasksService, ...eventRepository],
})
export class AppModule {}
