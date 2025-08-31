import { User } from '../../user/entities/user.entity';

type UserWithoutPassword = Omit<User, 'password'>;

interface IPayload {
  username: string;
  id: number;
}

interface SessionData {
  loggedin?: boolean;
  username?: string;
  balance?: number;
  file_history?: string;
  account_no?: number;
}

export interface RequestWithSession extends Request {
  session: SessionData;
}
