import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from '../../common/database/abstract.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({ versionKey: false })
@ObjectType()
export class User extends AbstractEntity {
  @Prop()
  // GraphQL 스키마에 노출되도록 @Field() 데코레이터를 사용한다.
  // Field 데코레이터에 인자를 전달하지 않으면 Typescript 타입을 기반으로 GraphQL 타입을 생성한다.
  @Field()
  email: string;

  // 비밀번호는 GraphQL 스키마에 노출되지 않도록 @Field() 데코레이터를 사용하지 않는다.
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
