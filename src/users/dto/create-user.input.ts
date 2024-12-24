import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @Field()
  @Length(8, 20, {
    message: '비밀번호는 8자 이상 20자 이하여야 합니다.',
  })
  password: string;
}
