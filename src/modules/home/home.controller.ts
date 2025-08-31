import { Controller, Get, Render } from '@nestjs/common';

@Controller('home')
export class HomeController {
  @Get()
  @Render('index')
  getHello(): object {
    return { title: 'Title', subtitle: 'Subtitle' };
  }
}
