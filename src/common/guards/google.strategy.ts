import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CREDENTIALS, SCOPE } from '../constants';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthenticationService) {
    super({ ...CREDENTIALS, scope: SCOPE });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });

    console.log('Validate');
    return { ...user, accessToken } || null;
  }
}
