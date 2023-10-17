import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { calendar_v3 } from '@googleapis/calendar/build/v3';

@Injectable()
export class CalendarService {
  async getAllEvents({ token }) {
    const authClient = google.auth.GoogleAuth;
    console.log(authClient);
    const calendar: calendar_v3.Calendar = google.calendar({
      version: 'v3',
      auth: token,
    });
    console.log(
      await calendar.calendarList.list({
        auth: token,
      }),
    );
    return await calendar.events.list();
  }
}
