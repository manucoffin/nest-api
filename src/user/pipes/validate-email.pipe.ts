import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class ValidateEmailPipe implements PipeTransform<any> {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async transform(value, { metatype }: ArgumentMetadata) {
    const user = await this.userService.findOneByEmail(value.email);

    if (user.length > 0) {
      throw new BadRequestException('Cet email est déjà utilisé.');
    }

    return value;
  }
}
