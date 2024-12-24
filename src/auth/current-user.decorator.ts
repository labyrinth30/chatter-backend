import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

/**
 * 현재 HTTP 요청 컨텍스트로 전환하고, 요청 객체를 가져와 user 속성을 반환
 * @param context
 */
const getCurrentUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};

/**
 * 현재 사용자를 가져오기 위한 데코레이터
 * context로부터 현재 사용자를 가져옴
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
