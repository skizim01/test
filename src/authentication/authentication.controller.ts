import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Post,
  Query,
} from '@nestjs/common';
import { GoogleAuthGuard } from '../common/guards/Guards';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
@ApiTags('auth')
export class AuthenticationController {
  private authService: AuthenticationService;

  @Get('google/link')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return this.authService.generateAuthUrl();
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Query('code') code: string) {
    return this.authService.setCredentials(code);
  }
}
