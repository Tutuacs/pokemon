import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthFunctionsService } from 'src/auth/auth-functions/auth-functions.service';
import { AuthService } from 'src/auth/auth.service';
export declare class RefreshJwtGuard implements CanActivate {
    private readonly authService;
    private readonly authFunctions;
    constructor(authService: AuthService, authFunctions: AuthFunctionsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
