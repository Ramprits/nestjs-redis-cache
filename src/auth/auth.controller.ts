import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  register(@Body('register') register: AuthDto) {
    return this.authService.register(register)
  }


  @Post("login")
  login(@Body('login') register: AuthDto) {
    return this.authService.login(register)
  }
}
