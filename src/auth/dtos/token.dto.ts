import { ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

import { jwtTokenPairSchema, jwtTokenProperty } from '@/common/swagger/options';

@ApiSchema(jwtTokenPairSchema)
export class JwtTokenPairDto {
  @ApiPropertyOptional(jwtTokenProperty)
  accessToken?: string;

  @ApiPropertyOptional(jwtTokenProperty)
  refreshToken?: string;
}
