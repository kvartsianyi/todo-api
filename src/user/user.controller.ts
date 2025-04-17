import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards';
import { UserEntity } from './user.entity';
import { User } from '@/common/decorators';
import {
  getProfileOperation,
  getProfileSuccessResponse,
  jwtTokenInvalidResponse,
} from '@/common/swagger/options';

@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor() {}

  @ApiOperation(getProfileOperation)
  @ApiOkResponse(getProfileSuccessResponse)
  @ApiUnauthorizedResponse(jwtTokenInvalidResponse)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getProfile(@User() user: UserEntity) {
    return user;
  }
}
