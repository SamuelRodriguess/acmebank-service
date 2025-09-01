import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get('home')
  @Render('index')
  getHello(): object {
    return { title: 'Title', subtitle: 'Subtitle' };
  }
}
