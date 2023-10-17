import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/db/models/user.model';
import { UserDetails } from '../common/types';
import { USER_REPOSITORY } from '../common/constants';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async validateUser(details: UserDetails) {
    console.log('AuthService');
    const user = await this.userRepository.findOne({
      where: { email: details.email },
    });
    if (user) return user;
    console.log('User not found. Creating...');
    return await this.userRepository.create(details);
  }

  async findUser(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
