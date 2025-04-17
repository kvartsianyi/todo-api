import { ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

import { jwtTokenProperty } from '@/common/swagger/options';
import { jwtTokenPairSchema } from '@/common/swagger/options/api-schema';

@ApiSchema(jwtTokenPairSchema)
export class JwtTokenPairDto {
  @ApiPropertyOptional(jwtTokenProperty)
  accessToken?: string;

  @ApiPropertyOptional(jwtTokenProperty)
  refreshToken?: string;
}
