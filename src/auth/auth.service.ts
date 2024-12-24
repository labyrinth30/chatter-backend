import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION'),
    );
    const tokenPayload: TokenPayload = {
      /**
       * MongoDB의 ObjectID는 12바이트의 16진수 문자열로 표현된다.
       * 이를 그대로 사용하면 JWT의 payload가 너무 커지므로
       * 24바이트의 16진수 문자열로 변환한다.
       * 이를 위해 toHexString() 메서드를 사용한다.
       */
      _id: user._id.toHexString(),
      email: user.email,
    };

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires
    });
  }
}
