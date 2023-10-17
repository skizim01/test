import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '../common/guards/Serializer';
import { DatabaseModule } from '../db/db.module';
import { userRepository } from '../db/repository';

@Module({
  imports: [PassportModule, DatabaseModule],
  providers: [AuthenticationService, SessionSerializer, ...userRepository],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
