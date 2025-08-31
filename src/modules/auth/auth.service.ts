/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
    req: any,
    res: any,
  ): Promise<UserWithoutPassword> {
    const userData = await this.userService.findByUsername(username);

    if (!userData || !userData.password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordMatching = await bcrypt.compare(pass, userData.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid username or password');
    }

    req.session.loggedin = true;
    req.session.username = userData.username;
    req.session.balance = userData.balance;
    req.session.file_history = userData.file_history;
    req.session.account_no = userData.account_no;

    return res.redirect('/home');
  }

  login(user: IPayload) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
