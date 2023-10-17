// import { Inject, Injectable } from '@nestjs/common';
// import { PassportSerializer } from '@nestjs/passport';
// import { User } from 'src/db/models/user.model';
// import { AuthenticationService } from '../../authentication/authentication.service';
//
// @Injectable()
// export class SessionSerializer extends PassportSerializer {
//   constructor(private readonly authService: AuthenticationService) {
//     super();
//   }
//
//   serializeUser(user, done: Function) {
//     console.log('Serializer User');
//     done(null, { ...user, accessToken: user.accessToken });
//   }
//
//   async deserializeUser(payload: any, done) {
//     const user = await this.authService.findUser(payload.dataValues.email);
//     console.log('Deserialize User');
//     return user
//       ? done(null, { user, accessToken: payload.accessToken })
//       : done(null, null);
//   }
// }
