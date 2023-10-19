import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DatabaseModule } from '../db/db.module';
import { userRepository } from '../db/repository';
import { ConfigModule } from '@nestjs/config';
import { Encryption } from '../common/utils';

@Module({
  imports: [PassportModule, DatabaseModule, ConfigModule],
  providers: [AuthenticationService, ...userRepository, Encryption],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
