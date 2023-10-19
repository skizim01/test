import { config } from 'dotenv';

config();
export const SCOPE = [
  'email',
  'profile',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.readonly',
  // 'https://www.googleapis.com/auth/calendar.events',
  // 'https://www.googleapis.com/auth/calendar.events.readonly',
  // 'https://www.googleapis.com/auth/calendar.settings.readonly',
];
export const CREDENTIALS = [
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/auth/google/redirect',
];

export const CRYPTO = {
  code: process.env.CODE,
  ivCode: Buffer.from(process.env.CODE_IV, 'utf8'),
  algorithm: process.env.ALGORITHM,
};
