import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from '../../auth/dto/input/register.user.input';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async getUserById(userId: number): Promise<(User | null)> {
        return this.usersRepository.findOneBy({ id: userId })
    }

    async getUserByEmailAndPassword(email: string, password: string): Promise<User|null> {
        return await this.usersRepository.findOneBy({
            email,
            password
        })
    }

    async createUser(user: RegisterUserInput): Promise<User> {
        const _user = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            createdAt: new Date(),
            updatedAt: new Date(),
            carts: [],
            orders: []
        }

        return this.usersRepository.save(_user)
    }
}
