import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
// swagger
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger'

@ApiTags('게시글 API')
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  @ApiOperation({
    summary: '전체 게시글 불러오기',
    description: '전체 게시글을 불러오는 API 입니다.'
  })
  @ApiUnauthorizedResponse({
    description: '로그인 되지 않은 경우'
  })
  @ApiOkResponse({
    description: '정상적으로 모든 게시글을 가져옴'
  })
  @Get('/')
  getALLBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  @ApiOperation({
    summary: '게시글 작성',
    description: '게시글을 작성하는 API 입니다.'
  })
  @ApiUnauthorizedResponse({
    description: '로그인 되지 않은 경우'
  })
  @ApiOkResponse({
    description: '정상적으로 게시글을 작성'
  })
  @ApiInternalServerErrorResponse({
    description: '비정상적인 요청 혹은 서버 오류'
  })
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creating a new board. payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }
  
  @ApiOperation({
    summary: '특정 글 가져오기',
    description: '특정 글을 가져오는 API 입니다.'
  })
  @ApiUnauthorizedResponse({
    description: '로그인 되지 않은 경우'
  })
  @ApiOkResponse({
    description: '정상적으로 게시글을 가져옴'
  })
  @ApiNotFoundResponse({
    description: '해당 게시글이 존재하지 않음'
  })
  @ApiInternalServerErrorResponse({
    description: '비정상적인 요청 혹은 서버 오류'
  })
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  
  @ApiOperation({
    summary: '글 삭제',
    description: '글을 삭제하는 API 입니다.'
  })
  @ApiParam({
    name: '삭제할 글의 id',
    type: 'number'
  })
  @ApiUnauthorizedResponse({
    description: '로그인 되지 않은 경우'
  })
  @ApiOkResponse({
    description: '정상적으로 게시글을 삭제'
  })
  @ApiNotFoundResponse({
    description: '삭제 할 게시글이 존재하지 않음'
  })
  @ApiInternalServerErrorResponse({
    description: '비정상적인 요청 혹은 서버 오류'
  })
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }
  
  @ApiOperation({
    summary: '글 상태(공개/비공개) 수정',
    description: '글 상태를 수정하는 API입니다.'
  })
  @ApiParam({
    name: '상태 수정할 글의 id',
    type: 'number'
  })
  @ApiUnauthorizedResponse({
    description: '로그인 되지 않은 경우'
  })
  @ApiOkResponse({
    description: '정상적으로 게시글 상태를 수정'
  })
  @ApiNotFoundResponse({
    description: '수정 할 게시글이 존재하지 않음'
  })
  @ApiInternalServerErrorResponse({
    description: '비정상적인 요청 혹은 서버 오류'
  })
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
