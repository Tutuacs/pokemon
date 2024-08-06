import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthFunctionsService } from 'src/auth/auth-functions/auth-functions.service';
import { AuthService } from 'src/auth/auth.service';

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

      if (profile.normalRolls <= 5) {
        // const time is the time btween the last roll and now
        const time = new Date().getTime() - profile.lastChargeNormalRoll.getTime();
        const hour = time.valueOf() / 1000 / 60 / 60;

        const rollsCharged = Math.floor(hour / 4);
        
        if (rollsCharged < 5 && profile.normalRolls + rollsCharged <= 5) {
          await this.authFunctions.updateRolls(profile.id, profile.normalRolls + rollsCharged);
        } else if (rollsCharged >= 5 && profile.normalRolls < 5) {
          await this.authFunctions.updateRolls(profile.id, 5);
      }
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
