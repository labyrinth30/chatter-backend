import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class GqlAuthGuard extends AuthGuard('jwt') {
  /**
   * 기본적으로 AuthGuard는 HTTP 요청용이므로
   * GraphQL 요청을 위한 getRequest 메서드를 오버라이드한다.
   * ctx.getContext().req로 GraphQL 요청의 HTTP 요청 객체를 반환함.
   * @param context
   */
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
