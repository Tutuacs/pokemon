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

      const lastChargeNormalRollDate = new Date(profile.lastChargeNormalRoll);

      if (profile.normalRolls <= ROLLS.TOTAL_NORMAL) {
        // Calcular o tempo entre a última carga e agora
        const time = new Date().getTime() - lastChargeNormalRollDate.getTime();
        const hour = time / (1000 * 60 * 60);

        const rollsCharged = Math.floor(hour / 4);

        if (rollsCharged > 0) {
          const newRolls = Math.min(
            ROLLS.TOTAL_NORMAL,
            profile.normalRolls + rollsCharged,
          );

          if (newRolls > profile.normalRolls) {
            await this.authFunctions.updateRolls(profile.id, newRolls);
            profile.normalRolls = newRolls;
            profile.lastChargeNormalRoll = new Date();
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
