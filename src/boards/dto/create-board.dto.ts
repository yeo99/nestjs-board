import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    example: '글 제목입니다.',
    description: 'title'
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '글 내용입니다.',
    description: 'description'
  })
  @IsNotEmpty()
  description: string;
}
