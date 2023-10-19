import { Inject, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { calendar_v3 } from '@googleapis/calendar/build/v3';
import { OAuth2Client } from 'googleapis-common';
import { Op } from 'sequelize';

import {
  CREDENTIALS,
  EVENT_REPOSITORY,
  USER_REPOSITORY,
} from '../common/constants';
import { Event, User } from '../db';
import { Encryption } from '../common/utils';
import { FilmSessionType } from '../common/types';

@Injectable()
export class CalendarService {
  private readonly oauth2Client: OAuth2Client;
  @Inject(EVENT_REPOSITORY)
  private readonly eventRepository: typeof Event;
  @Inject(USER_REPOSITORY)
  private readonly useRepository: typeof User;

  constructor(private encryption: Encryption) {
    this.oauth2Client = new google.auth.OAuth2(...CREDENTIALS);
  }

  async getAllEvents({ token, email }) {
    this.oauth2Client.setCredentials({ access_token: token });
    const calendar: calendar_v3.Calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });
    const calendars = (await calendar.calendarList.list()).data.items;
    const hour = new Date(new Date().getTime()).toJSON();
    const events = [];
    await this.eventRepository.destroy({
      where: {
        end: {
          [Op.lt]: new Date(),
        },
      },
    });
    await Promise.all(
      calendars.map((item) => {
        return calendar.events
          .list({ calendarId: item.id, timeMin: hour })
          .then(async (data) => {
            for (const event of data.data.items) {
              const { id, end, start, summary } = event;
              if (event.start.dateTime) {
                const defaults = {
                  id,
                  title: summary,
                  start: new Date(start.dateTime),
                  end: new Date(end.dateTime),
                  email: this.encryption.decryption(email),
                };
                const [user, created] = await this.eventRepository.findOrBuild({
                  where: { id },
                  defaults,
                });
                events.push(defaults);
                if (created) {
                  await user.save();
                }
              }
            }
          });
      }),
    );
    return events;
  }

  async getAllSlot(
    email: string,
    movieDuration: number,
    movieStartTimes: string[],
  ) {
    const events = await this.eventRepository.findAll({
      where: {
        email,
      },
    });
    return this.findMovieTimeOptions(events, movieDuration, movieStartTimes);
  }

  private findMovieTimeOptions(
    events: Event[],
    movieDuration: number,
    movieStartTimes: string[],
  ) {
    events.sort((a, b) => a.start.getTime() - b.start.getTime());
    const availableTimeSlots = [];

    for (const movieStartTime of movieStartTimes) {
      let currentEnd = new Date(movieStartTime);
      const movieEnd = new Date(movieStartTime);
      movieEnd.setMinutes(movieEnd.getMinutes() + movieDuration);

      for (const event of events) {
        if (event.end <= currentEnd) {
          continue;
        }
        if (event.start >= movieEnd) {
          availableTimeSlots.push({
            start: currentEnd,
            end: event.start,
          });
        }
        if (event.end > currentEnd) {
          currentEnd = event.end;
        }
      }
      if (currentEnd < movieEnd) {
        availableTimeSlots.push({
          start: currentEnd,
          end: movieEnd,
        });
      }
    }

    return availableTimeSlots;
  }
}
