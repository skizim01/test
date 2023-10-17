import { Module } from '@nestjs/common';

import { AuthenticationModule } from './authentication/authentication.module';
import { CalendarModule } from './calendar/calendar.module';
import { ConfigModule } from '@nestjs/config';
// import { GoogleStrategy } from './common/guards/google.strategy';
// import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './db/db.module';
import { databaseProviders } from './db/db.providers';

@Module({
  imports: [
    AuthenticationModule,
    CalendarModule,
    DatabaseModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
