import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserCategory } from '../enums/user-category.enum';

export class CreateUserDto {
  readonly avatar: ArrayBuffer;

  readonly category: UserCategory;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  readonly isAuthor: boolean;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly mobilePhone: string;

  @IsNotEmpty()
  readonly password: string;
}
