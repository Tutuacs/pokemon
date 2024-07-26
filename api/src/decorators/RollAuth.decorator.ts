import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const RollAuth = createParamDecorator(
  (filterData: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.profile.rolls) {
      if (filterData) {
        return request.profile.rolls[filterData];
      } else {
        return request.profile.rolls;
      }
    } else {
      throw new ForbiddenException(
        'Usuário logado não encontrado no banco de dados, Use o AuthGuard para obter o usuário',
      );
    }
  },
);

export type Chances = {
  normalChance: number;
  rareChance: number;
  superRareChance: number;
  epicChance: number;
  mythicChance: number;
  legendaryChance: number;
  shinyChance: number;
};
