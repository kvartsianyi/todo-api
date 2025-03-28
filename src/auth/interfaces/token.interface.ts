export interface IJwtTokenPair {
  accessToken?: string;
  refreshToken?: string;
}

export interface ITokenPayload {
  sub: number;
}
