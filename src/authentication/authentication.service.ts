import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { OAuth2Client } from 'googleapis-common';
import { Response } from 'express';
import { google } from 'googleapis';

import { User } from 'src/db/models/user.model';
import { CREDENTIALS, SCOPE, USER_REPOSITORY } from 'src/common/constants';
import { Encryption } from 'src/common/utils';

@Injectable()
export class AuthenticationService implements OnModuleInit {
  private readonly oauth2Client: OAuth2Client;
  @Inject(USER_REPOSITORY)
  private readonly userRepository: typeof User;

  constructor(private encryption: Encryption) {
    this.oauth2Client = new google.auth.OAuth2(...CREDENTIALS);
  }
  onModuleInit(): any {
    this.encryption.encryption('data');
  }

  async generateAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: SCOPE,
    });
  }

  async setCredentials(code: string, res: Response) {
    const authData = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(authData.tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: this.oauth2Client });
    const profile = await oauth2.userinfo.get();

    const [user, created] = await this.userRepository.findOrBuild({
      where: { email: profile.data.email },
      defaults: {
        email: profile.data.email,
        name: profile.data.name,
        locale: profile.data.locale,
        refresh_token: this.encryption.encryption(
          authData.tokens.refresh_token,
        ),
      },
    });
    if (created) {
      await user.save();
    }
    res.cookie('access_token', authData.tokens.access_token, {
      httpOnly: true,
      sameSite: true,
      expires: new Date(authData.tokens.expiry_date),
    });
    res.cookie('email', this.encryption.encryption(profile.data.email), {
      httpOnly: true,
      sameSite: 'none',
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
    });

    return res;
  }
}
