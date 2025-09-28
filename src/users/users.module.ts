import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  providers: [
    UsersService, 
    UserResolver
  ],
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  exports: [
    UsersService
  ],
})
export class UsersModule { }
