import { Controller, Get, Req, Res } from '@nestjs/common';
import express from 'express';
import path from 'path';

@Controller()
export class AppController {
  @Get()
  root(@Req() req: express.Request, @Res() res: express.Response) {
    res.sendFile(path.join(__dirname + '../../html/login.html'));
  }
}
