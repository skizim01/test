import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
@ApiTags('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Get('google/link')
  @ApiProperty({ description: 'Отримання url для Google Oauth2' })
  async handleLogin() {
    const url = await this.authService.generateAuthUrl();
    return { url };
  }

  @Get('google/redirect')
  async HandleRedirect(@Query('code') code: string, @Res() res: Response) {
    res.json({ msg: 'OK' }).send();
  }

  @Get('google/redirect/true')
  @ApiProperty({
    description: 'Авторизація в системі та отримання access_token',
  })
  async trueHandleRedirect(@Query('code') code: string, @Res() res: Response) {
    await this.authService.setCredentials(code, res);
    res.json({ msg: 'OK' }).send();
  }
}
