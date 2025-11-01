import { User as UserOutputDTO } from '../dto/output/user.output';
import { User } from 'src/entities/user.entity';

export class UserMapper {
  static toDTO(user: User): UserOutputDTO {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  }
}
