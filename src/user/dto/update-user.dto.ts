import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { UserCategory } from '../../user/enums/user-category.enum';

export class UpdateUserDto {
  @IsDefined()
  @ApiModelProperty()
  readonly avatar: ArrayBuffer;

  @IsDefined()
  @ApiModelProperty()
  readonly category: UserCategory;

  @IsEmail()
  @IsDefined()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  readonly firstName: string;

  @IsBoolean()
  @IsDefined()
  @ApiModelProperty()
  readonly isAuthor: boolean;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  readonly lastName: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  readonly mobilePhone: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiModelProperty()
  readonly password: string;
}
