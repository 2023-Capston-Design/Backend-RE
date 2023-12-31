import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user;
    if (!user) {
      throw new ForbiddenException('Forbidden Request');
    }

    // If data designed
    try {
      return data ? user[data] : user;
    } catch (err) {
      throw new UnauthorizedException('User not found in request object');
    }
  },
);
