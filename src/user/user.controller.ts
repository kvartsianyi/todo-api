import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('users')
export class UserController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return 'profile';
  }
}
