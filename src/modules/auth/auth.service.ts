import bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { IPayload, UserWithoutPassword } from './typings/auth';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserWithoutPassword> {
    const userData = await this.userService.findByUsername(username);

    if (!userData || !userData.password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordMatching = await bcrypt.compare(pass, userData.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid username or password');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userData;
    return result;
  }

  login(user: IPayload) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
