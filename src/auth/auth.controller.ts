import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBookDto, RegisterMemberDto, RegisterTransactionDto, RegisterUserDto } from './dto/register.dto';
import { LoginMemberDto, LoginUserDto } from './dto/login.dto';
import { Public } from 'src/helpers/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('registerUser')
  registerUser(@Body() registerDto: RegisterUserDto){
    return this.authService.registerUser(registerDto);
  }

  @Public()
  @Post('registerMember')
  registerMember(@Body() registerDto: RegisterMemberDto){
    return this.authService.registerMember(registerDto);
  }

  @Public()
  @Post('loginUser')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }

  @Public()
  @Post('loginMember')
  loginMember(@Body() loginMemberDto: LoginMemberDto){
    return this.authService.loginMember(loginMemberDto);
  }

  @Public()
  @Post('registerBook')
  registerBook(@Body() registerBookDto: RegisterBookDto){
    return this.authService.registerBook(registerBookDto);
  }

  @Public()
  @Post('registerTransaction')
  registerTransaction(@Body() registerTransactionDto: RegisterTransactionDto){
    return this.authService.registerTransaction(registerTransactionDto);
  }
}
