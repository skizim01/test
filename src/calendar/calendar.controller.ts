import { Controller, Get, Req } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Request } from 'express';

@Controller('calendar')
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @Get()
  async getEventsList(@Req() req: Request) {
    return await this.calendarService.getAllEvents({
      // @ts-ignore
      token: req.user.accessToken,
    });
  }
}
