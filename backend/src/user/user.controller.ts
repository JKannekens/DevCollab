import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userSerivce: UserService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; displayName: string; password: string },
  ) {
    return this.userSerivce.register(
      body.email,
      body.displayName,
      body.password,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.userSerivce.login(body.email, body.password);
  }
}
