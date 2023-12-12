import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
// swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiProperty, ApiCreatedResponse, ApiBody, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('회원 관련 API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '회원 가입 API',
    description: '회원 가입입니다.'
  })
  @ApiCreatedResponse({
    description: '유저 생성됨',
  })
  @ApiInternalServerErrorResponse({
    description: '중복 아이디 혹은 서버 오류',
    schema: {}
  })
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiOperation({ summary: '회원 로그인 API', description: '회원 로그인입니다.' })
  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log('user', user);
  // }
}
