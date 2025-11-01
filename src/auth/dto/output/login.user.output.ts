import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JWTPayload {
  @Field(() => ID)
  id?: number;

  @Field()
  email: string;
}

@ObjectType()
export class LoginUserOutput {
  @Field()
  accessToken: string;
}
