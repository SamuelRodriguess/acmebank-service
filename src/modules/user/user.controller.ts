import express from 'express';
import {
  Controller,
  Post,
  Body,
  Req,
  Res /* UseGuards */,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
/* import { csrfMiddleware } from '../middleware/csurf/csrf';
 */
interface IRequest extends express.Request {
  session: {
    loggedin: boolean;
    username: string;
    balance: number;
    file_history: string;
    account_no: number;
  };
}

@Controller('user')
export class UserController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('/auth')
  /*   @UseGuards(csrfMiddleware)
   */
  async login(
    @Body() createUserDto: CreateUserDto,
    @Req() req: IRequest,
    @Res() res: express.Response,
  ) {
    const { username, password } = createUserDto;
    const user = await this.UsersService.findByUsernameAndPassword(
      username,
      password,
    );
    if (user) {
      req.session.loggedin = true;
      req.session.username = user.username;
      req.session.balance = user.balance;
      req.session.file_history = user.file_history;
      req.session.account_no = user.account_no;
      return res.redirect('/home');
    }
    return res.send('Incorrect Username and/or Password!');
  }
}
