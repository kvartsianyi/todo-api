import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { IJwtTokenPair } from './interfaces';
import { RegisterUserDto } from './dtos';
import { UserService } from '@/user/user.service';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';
import { TokenTypeEnum } from './constants';
import { UserEntity } from '@/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly userService: UserService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(registerUserDto);

    return user;
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByParams({ username });

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.bcryptService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async refreshToken(userId: number): Promise<IJwtTokenPair> {
    return {
      accessToken: await this.generateToken(userId),
    };
  }

  async generateTokenPair(userId: number): Promise<IJwtTokenPair> {
    const accessToken = await this.generateToken(userId);
    const refreshToken = await this.generateToken(
      userId,
      TokenTypeEnum.REFRESH,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateToken(
    userId: number,
    type: TokenTypeEnum = TokenTypeEnum.ACCESS,
  ): Promise<string> {
    const payload = { sub: userId };
    const config = {
      access: {
        secret: 'ACCESS_TOKEN_SECRET',
        expiresIn: 'ACCESS_TOKEN_EXPIRES_IN',
      },
      refresh: {
        secret: 'REFRESH_TOKEN_SECRET',
        expiresIn: 'REFRESH_TOKEN_EXPIRES_IN',
      },
    }[type];

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get(config.secret),
      expiresIn: this.configService.get(config.expiresIn),
    });
  }
}
