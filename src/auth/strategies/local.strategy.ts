import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { UserEntity } from '@/user/user.entity';
import { LOGIN_BAD_CREDENTIALS } from '../constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new BadRequestException(LOGIN_BAD_CREDENTIALS);
    }

    return user;
  }
}
