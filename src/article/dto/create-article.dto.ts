import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly content: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly title: string;
}
