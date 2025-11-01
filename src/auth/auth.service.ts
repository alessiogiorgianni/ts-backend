import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginUserOutput,
  JWTPayload,
} from 'src/auth/dto/output/login.user.output';
import { RegisterUserInput } from 'src/auth/dto/input/register.user.input';
import { User } from 'src/graphql';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signUp(data: RegisterUserInput): Promise<User> {
    if (data.password !== data.repeatedPassword) {
      throw Error('Password and RepatedPassword are not same!');
    }

    return this.userService.createUser(data);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<LoginUserOutput | null> {
    const user = await this.userService.getUserByEmailAndPassword(
      email,
      password,
    );

    if (user !== null) {
      const jwtPayload: JWTPayload = {
        id: user.id,
        email: user.email,
      };

      const signedJwtToken = this.jwtService.sign(jwtPayload);

      return {
        accessToken: signedJwtToken,
      };
    }

    return null;
  }
}
