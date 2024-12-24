import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  @UseGuards(LocalAuthGuard)
  // Response 객체에 cookie에 JWT 토큰을 저장하는 로직을 추가하기 위해
  // @Res() 데코레이터를 사용하고, passthrough 옵션을 true로 설정한다.
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }
}
