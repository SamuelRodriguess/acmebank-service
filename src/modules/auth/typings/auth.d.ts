import { User } from '../../user/entities/user.entity';

type UserWithoutPassword = Omit<User, 'password'>;

interface IPayload {
  username: string;
  id: number;
}
