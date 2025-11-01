import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => Date)
  birthDate: Date;

  @Field()
  password: string;

  @Field()
  repeatedPassword: string;
}
