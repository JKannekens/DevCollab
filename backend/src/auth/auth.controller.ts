import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';

@Controller()
export class AuthController {
  constructor() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleRedirect(@Req() req) {
    return req.user;
  }

  @UseGuards(GithubAuthGuard)
  @Get('github')
  githubRedirect(@Req() req) {
    return req.user;
  }
}
