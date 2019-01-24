import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsDefined()
  @ApiModelProperty()
  readonly email: string;

  @IsDefined()
  @ApiModelProperty()
  readonly password: string;
}
