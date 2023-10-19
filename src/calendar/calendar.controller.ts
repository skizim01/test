import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CalendarService } from './calendar.service';
import { GoogleAuthGuard } from '../common/guards/Guards';
import { GetTimeSlotDto } from '../common/dto/get-time-slot.dto';

@Controller('calendar')
@ApiTags('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  @ApiOperation({
    description: 'Отримання та оновлення всіх подій які заплановані',
  })
  @UseGuards(GoogleAuthGuard)
  async getEventsList(@Req() req: Request) {
    return await this.calendarService.getAllEvents({
      token: req.cookies.access_token,
      email: req.cookies.email,
    });
  }

  @Post('slot/all')
  @UseGuards(GoogleAuthGuard)
  @ApiProperty({
    description:
      'Перевірка на те на який фільм можна піти, та не було пересікань з подіями в календарі ',
  })
  @ApiBody({
    type: GetTimeSlotDto,
    description:
      'movieDuration: тривалість фільму в хвилинах, movieStartTimes: масив часу початку фільму',
  })
  async getAllSlot(
    @Req() req: Request,
    @Body() body: { movieDuration: number; movieStartTimes: string[] },
  ) {
    return await this.calendarService.getAllSlot(
      req.cookies.email,
      body.movieDuration,
      body.movieStartTimes,
    );
  }
}
