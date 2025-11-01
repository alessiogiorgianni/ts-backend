import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from '../../auth/dto/input/register.user.input';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: userId });
  }

  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({
      email: email,
    });

    if (user === null) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async createUser(user: RegisterUserInput): Promise<User> {
    const passwordHash = await this.hashPassword(user.password);

    const _user = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      carts: [],
      orders: [],
    };

    return this.usersRepository.save(_user);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');

    return bcrypt.hash(password, saltOrRounds);
  }
}
