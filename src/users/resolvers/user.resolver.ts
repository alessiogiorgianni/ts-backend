import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User as UserEntity } from 'src/entities/user.entity';
import { UsersService } from '../services/users.service';
import { User as UserOutputDTO } from 'src/users/dto/output/user.output';
import { UserMapper } from '../mappers/user.mapper';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => UserOutputDTO)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserOutputDTO])
  async getAllUsers(): Promise<UserOutputDTO[]> {
    const users = await this.userService.getAllUsers();

    const usersOutput: UserOutputDTO[] = users.map((user: UserEntity) => {
      return UserMapper.toDTO(user);
    });

    return usersOutput;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserOutputDTO, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserOutputDTO | null> {
    const user = await this.userService.getUserById(id);

    return null !== user ? UserMapper.toDTO(user) : null;
  }
}
