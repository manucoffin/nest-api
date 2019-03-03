import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SetReqUserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        const token = req.headers.authorization.split(' ')[1];

        const legit = this.jwtService.verify(token);

        req.payload = legit;
        next();
      } else {
        return res.status(401).json('The access token is not valid.');
      }
    };
  }
}
