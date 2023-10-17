import { Controller, Get, UseGuards, Req, Body, Post } from '@nestjs/common';
import { GoogleAuthGuard } from '../common/guards/Guards';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthenticationController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(@Body() body: any) {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() request: Request) {
    return { msg: 'OK' };
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
  @Post('token')
  getToken(@Req() request: Request) {
    if (request.user) {
      // @ts-ignore
      return request.user.accessToken;
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
