/* eslint-disable @typescript-eslint/no-unused-vars */

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

  async validateUser(username: string, pass: string): Promise<UserWithoutPassword | null> {
    const userData = await this.userService.findByUsername(username);

    if (!userData || !userData.password) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(pass, userData.password);

    if (!isPasswordMatching) {
      return null;
    }

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
