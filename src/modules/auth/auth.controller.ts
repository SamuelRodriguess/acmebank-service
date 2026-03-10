/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/await-thenable */
import {
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any, @Res() res: Response) {
    const loginResult = await this.authService.login(req.user);
    console.log("🚀 ~ AuthController ~ login ~ loginResult:", loginResult)

    // If it's a browser request (Accept: text/html), redirect or return success
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (req.accepts('html')) {
      // Manual session setup if not handled automatically by Passport
      req.session.loggedin = true;
      req.session.username = req.user.username;
      req.session.balance = req.user.balance;
      req.session.file_history = req.user.file_history;
      req.session.account_no = req.user.account_no;
      
      return res.redirect('/');
    }

    return res.json(loginResult);
  }

  @Post('newlogin')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async newLogin(@Body() body: any, @Res() res: Response, @Req() req: any) {
    try {
      await this.authService.create(body);
      return res.redirect('/');
    } catch (error) {
      // Em uma aplicação real, seria melhor redirecionar com uma mensagem de erro.
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
      return res.status(400).send(`<html><body><h2>Não foi possível criar a conta.</h2><p>${errorMessage}</p><a href="/">Voltar</a></body></html>`);
    }
  }

  @Get('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    req.logout((err: any) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      req.session.destroy();
      res.redirect('/');
    });
  }
}
