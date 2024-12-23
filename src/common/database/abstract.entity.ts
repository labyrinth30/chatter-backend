import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Schema()
@ObjectType({ isAbstract: true })
export class AbstractEntity {
  @Prop({
    type: SchemaTypes.ObjectId,
  })
  // ObjectId 타입을 해석하지 못해 명시적으로 ID 타입을 사용한다.
  @Field(() => ID)
  _id: Types.ObjectId;
}
