import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from '@/user/dtos';
import { JwtTokenPairDto } from './dtos';
import { UserEntity } from '@/user/user.entity';
import { RefreshJwtAuthGuard, LocalAuthGuard } from './guards';
import { User } from '@/common/decorators';
import {
  loginOperation,
  registrationBadRequestResponse,
  registrationSuccessResponse,
  registrationOperation,
  loginSuccessResponse,
  loginBadRequestResponse,
  tokenRefreshOperation,
  tokenRefreshSuccessResponse,
  tokenRefreshUnauthorizedResponse,
} from '@/common/swagger/options';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(registrationOperation)
  @ApiCreatedResponse(registrationSuccessResponse)
  @ApiBadRequestResponse(registrationBadRequestResponse)
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    return this.authService.register(registerUserDto);
  }

  @ApiOperation(loginOperation)
  @ApiOkResponse(loginSuccessResponse)
  @ApiBadRequestResponse(loginBadRequestResponse)
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@User() user: UserEntity): Promise<JwtTokenPairDto> {
    return this.authService.generateTokenPair(user.id);
  }

  @ApiBearerAuth()
  @ApiOperation(tokenRefreshOperation)
  @ApiOkResponse(tokenRefreshSuccessResponse)
  @ApiUnauthorizedResponse(tokenRefreshUnauthorizedResponse)
  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@User() user: UserEntity): Promise<JwtTokenPairDto> {
    return this.authService.refreshToken(user.id);
  }
}
