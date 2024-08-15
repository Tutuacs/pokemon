import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthFunctionsService } from 'src/auth/auth-functions/auth-functions.service';
import { AuthService } from 'src/auth/auth.service';
import { ROLLS } from 'src/enums/rolls.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly authFunctions: AuthFunctionsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const token = this.extractTokenFromHeader(request);
      const data = await this.authService.checkToken(token);
      const profile = await this.authFunctions.profileInfo(data.id);

      if (profile.normalRolls < ROLLS.TOTAL_NORMAL) {
        const lastChargeTime = new Date(profile.lastChargeNormalRoll).getTime();
        const currentTime = new Date().getTime();
        const elapsedHours = (currentTime - lastChargeTime) / (1000 * 60 * 60);

        const rollsCharged = Math.floor(elapsedHours / 4); // 1 roll a cada 4 horas

        // Verifica se é possível adicionar rolls e se estamos dentro do limite
        if (rollsCharged > 0) {
          const updatedRolls = Math.min(
            ROLLS.TOTAL_NORMAL,
            profile.normalRolls + rollsCharged,
          );

          if (updatedRolls !== profile.normalRolls) {
            profile.normalRolls = updatedRolls;
            profile.lastChargeNormalRoll = new Date(); // Atualiza a última data de carga
            await this.authFunctions.updateRolls(profile.id, updatedRolls);
          }
        }
      }

      request.profile = profile;
      request.rolls = {
        profileId: profile.id,
        normalChance: profile.normalChance,
        rareChance: profile.rareChance,
        superRareChance: profile.superRareChance,
        epicChance: profile.epicChance,
        mithycChance: profile.mithycChance,
        legendaryChance: profile.legendaryChance,
        shinyChance: profile.shinyChance,
        normalRolls: profile.normalRolls,
      };

      return true;
    } catch {
      console.log({
        AuthGuard:
          'src/guards/AuthGuard: Token não identificado.(token não valido)',
      });
      return false;
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
