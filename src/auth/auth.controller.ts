import { Controller, Post, UseGuards, Body } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos';
import { IJwtTokenPair } from './interfaces';
import { UserEntity } from '@/user/user.entity';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { User } from '@/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@User() user: UserEntity): Promise<IJwtTokenPair> {
    return this.authService.generateTokenPair(user.id);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refresh(@User() user: UserEntity): Promise<IJwtTokenPair> {
    return this.authService.refreshToken(user.id);
  }
}
