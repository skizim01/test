import {
  Injectable,
  ExecutionContext,
  Inject,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { CREDENTIALS, USER_REPOSITORY } from '../constants';
import axios from 'axios';
import { User } from '../../db';
import { OAuth2Client } from 'googleapis-common';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Encryption } from '../utils';
import { Request } from 'express';

@Injectable()
export class GoogleAuthGuard {
  private readonly oauth2Client: OAuth2Client;

  constructor(
    private encryption: Encryption,
    private authService: AuthenticationService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {
    this.oauth2Client = new google.auth.OAuth2(...CREDENTIALS);
  }

  async canActivate(context: ExecutionContext) {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      const access_token = request.cookies.access_token;

      const res = access_token
        ? await axios
            .get(
              'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' +
                access_token,
            )
            .catch(() => {
              console.log('invalid token');
              return null;
            })
        : null;
      if (res) {
        return true;
      } else {
        if (request.cookies.email) {
          const user = await this.userRepository.findOne({
            where: {
              email: this.encryption.decryption(request.cookies.email),
            },
          });
          if (!user) {
            response
              .json({ url: await this.authService.generateAuthUrl() })
              .send();
          }
          const refresh_token = this.encryption.decryption(
            user.dataValues.refresh_token,
          );
          this.oauth2Client.setCredentials({ refresh_token });
          const access_token = await this.oauth2Client.getAccessToken();
          response.cookie('access_token', access_token.token, {
            httpOnly: true,
            sameSite: true,
          });
          request.cookies['access_token'] = access_token;
          return true;
        } else {
          response
            .json({ url: await this.authService.generateAuthUrl() })
            .send();
        }
      }
    } catch (e) {
      throw new HttpException('server error', 500);
    }
  }
}
