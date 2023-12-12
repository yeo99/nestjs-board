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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiProperty, ApiCreatedResponse, ApiBody, ApiInternalServerErrorResponse, ApiAcceptedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

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
  })
  @ApiBadRequestResponse({
    description: '아이디는 3글자 이상, 비밀번호는 4글자 이상이여야 함'
  })
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiOperation({ summary: '회원 로그인 API', description: '회원 로그인입니다.' })
  @ApiOkResponse({
    description: '정상적으로 로그인 했다면 JWT 토큰을 객체에 담아 accessToken Key로 전송'
  })
  @ApiUnauthorizedResponse({
    description: '로그인 아이디 혹은 비밀번호 틀림'
  })
  @ApiBadRequestResponse({
    description: '아이디는 3글자 이상, 비밀번호는 4글자 이상이여야 함'
  })
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
