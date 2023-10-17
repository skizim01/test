import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/db/models/user.model';
import { UserDetails } from '../common/types';
import { CREDENTIALS, SCOPE, USER_REPOSITORY } from '../common/constants';
import { google } from 'googleapis';

@Injectable()
export class AuthenticationService implements OnModuleInit {
  private oauth2Client;

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  onModuleInit(): any {
    this.oauth2Client = new google.auth.OAuth2(...CREDENTIALS);
  }

  async generateAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPE,
    });
  }

  async setCredentials(code) {
    const authData = await this.oauth2Client.getToken(code);
    console.log(authData);
    this.oauth2Client.setCredentials(authData.tokens);
  }
}
