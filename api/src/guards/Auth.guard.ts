import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthFunctionsService } from 'src/auth/auth-functions/auth-functions.service';
import { AuthService } from 'src/auth/auth.service';
import { ROLLS } from 'src/decorators/rolls.enum';

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

      
      if (profile.normalRolls <= ROLLS.TOTAL_NORMAL) {
        // const time is the time btween the last roll and now
        const time = new Date().getTime() - profile.lastChargeNormalRoll.getTime();
        const hour = time.valueOf() / 1000 / 60 / 60;
        
        const rollsCharged = Math.floor(hour / 4);
        
        if (rollsCharged < ROLLS.TOTAL_NORMAL && rollsCharged > 0 && profile.normalRolls + rollsCharged <= ROLLS.TOTAL_NORMAL) {
          await this.authFunctions.updateRolls(profile.id, profile.normalRolls + rollsCharged);
          profile.normalRolls += rollsCharged;
        } else if (rollsCharged >= ROLLS.TOTAL_NORMAL && profile.normalRolls < ROLLS.TOTAL_NORMAL) {
          profile.normalRolls = ROLLS.TOTAL_NORMAL;
          await this.authFunctions.updateRolls(profile.id, ROLLS.TOTAL_NORMAL);
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
      }

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
