import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthFunctionsService } from 'src/auth/auth-functions/auth-functions.service';
import { AuthService } from 'src/auth/auth.service';
import { ROLLS } from 'src/enums/rolls.enum';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly authFunctions: AuthFunctionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const profile = await this.authService.checkRefreshToken(token);

      // Certifique-se de que lastChargeNormalRoll seja uma instância de Date
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
    } catch (error) {
      throw new UnauthorizedException('Login expired. Please log in again.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
