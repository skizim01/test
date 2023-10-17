import { config } from 'dotenv';

config();
export const SCOPE = [
  'email',
  'profile',
  // 'https://www.googleapis.com/auth/calendar',
  // 'https://www.googleapis.com/auth/calendar.readonly',
  // 'https://www.googleapis.com/auth/calendar.events',
  // 'https://www.googleapis.com/auth/calendar.events.readonly',
  // 'https://www.googleapis.com/auth/calendar.settings.readonly',
];
export const CREDENTIALS = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/google/redirect',
};
