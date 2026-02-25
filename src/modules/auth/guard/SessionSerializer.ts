import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: Error | null, user: any) => void) {
    done(null, { id: user.id, username: user.username });
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, user: any) => void,
  ) {
    const user = await this.userService.findByUsername(payload.username);
    done(null, user);
  }
}
