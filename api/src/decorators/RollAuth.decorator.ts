import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const RollAuth = createParamDecorator(
  (filterData: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.rolls) {
      if (filterData) {
        if(filterData === 'chances'){
          const chances: Chances = {
            ...request.rolls
          }
          return chances;
        }
        return request.rolls[filterData];
      } else {
        return request.rolls;
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
  mithycChance: number;
  legendaryChance: number;
  shinyChance: number;
};
