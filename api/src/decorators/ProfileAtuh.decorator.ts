import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ROLE } from './role.enums';

export const ProfileAuth = createParamDecorator(
  (filterData: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    console.log(request.profile)

    if (request.profile) {
      if (filterData) {
        return request.profile[filterData];
      } else {
        return request.profile;
      }
    } else {
      throw new ForbiddenException(
          'Usuário logado não encontrado no banco de dados, Use o AuthGuard para obter o usuário',
        );
    }
  },
);
