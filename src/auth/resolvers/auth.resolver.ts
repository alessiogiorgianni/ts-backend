import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserInput } from '../dto/input/register.user.input';
import { User } from 'src/users/dto/output/user.output';
import { LoginUserOutput } from 'src/auth/dto/output/login.user.output';
import { LoginUserInput } from 'src/auth/dto/input/login.user.input';
import { AuthService } from 'src/auth/services/auth.service';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Mutation(() => User)
    async signUp(
        @Args('data') data: RegisterUserInput
    ): Promise<User> {
        return this.authService.signUp(data)
    }

    @Mutation(
        () => LoginUserOutput,
        {nullable: true}
    )
    async signIn(
        @Args('data') data: LoginUserInput
    ): Promise<LoginUserOutput | null> {
        return this.authService.signIn(data.email, data.password)
    }
}