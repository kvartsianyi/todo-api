import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from '../interfaces';
import { UserService } from '@/user/user.service';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET') as string,
    });
  }

  async validate(payload: ITokenPayload) {
    const user = await this.userService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
