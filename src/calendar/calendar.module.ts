import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { Encryption } from '../common/utils';
import { eventRepository, userRepository } from '../db/repository';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [CalendarController],
  providers: [
    CalendarService,
    Encryption,
    ...userRepository,
    ...eventRepository,
  ],
})
export class CalendarModule {}
