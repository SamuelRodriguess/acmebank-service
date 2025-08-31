import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() createAuthDto: CreateAuthDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { username, password } = createAuthDto;

    const user = await this.authService.validateUser(
      username,
      password,
      req,
      res,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return this.authService.login(user);
  }
}
