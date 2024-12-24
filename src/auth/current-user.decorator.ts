import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

/**
 * 현재 HTTP 요청 컨텍스트로 전환하고, 요청 객체를 가져와 user 속성을 반환
 * GraphQL 요청의 경우 GqlExecutionContext를 사용하여 요청 객체를 가져옴
 * @param context
 */
const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  } else if (context.getType<GqlContextType>() === 'graphql') {
    return GqlExecutionContext.create(context).getContext().req.user;
  }
};

/**
 * 현재 사용자를 가져오기 위한 데코레이터
 * context로부터 현재 사용자를 가져옴
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
