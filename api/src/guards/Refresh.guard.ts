import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthFunctionsService } from 'src/auth/auth-functions/auth-functions.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly authFunctions: AuthFunctionsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) throw new UnauthorizedException();
    
    try {
      const profile = await this.authService.checkRefreshToken(token);
      request.profile = profile;

      if (profile.normalRolls <= 5) {
        // const time is the time btween the last roll and now
        const time = new Date().getTime() - profile.lastChargeNormalRoll.getTime();
        const hour = time.valueOf() / 1000 / 60 / 60;

        const rollsCharged = Math.floor(hour / 4);
        
        if (rollsCharged < 5 && profile.normalRolls + rollsCharged < 5) {
          await this.authFunctions.updateRolls(profile.id, profile.normalRolls + rollsCharged);
        } else if (rollsCharged >= 5 && profile.normalRolls < 5) {
          await this.authFunctions.updateRolls(profile.id, 5);
      }
    }
    } catch {
      throw new UnauthorizedException("Login expired. Please log in again.");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
