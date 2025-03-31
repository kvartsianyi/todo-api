import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserEntity } from './user.entity';
import { User } from '@/common/decorators';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor() {}

  @Get('profile')
  getProfile(@User() user: UserEntity) {
    return user;
  }
}
