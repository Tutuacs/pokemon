"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_functions_service_1 = require("../auth/auth-functions/auth-functions.service");
const auth_service_1 = require("../auth/auth.service");
const rolls_enum_1 = require("../decorators/rolls.enum");
let RefreshJwtGuard = class RefreshJwtGuard {
    constructor(authService, authFunctions) {
        this.authService = authService;
        this.authFunctions = authFunctions;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new common_1.UnauthorizedException();
        try {
            const profile = await this.authService.checkRefreshToken(token);
            const lastChargeNormalRollDate = new Date(profile.lastChargeNormalRoll);
            if (profile.normalRolls <= rolls_enum_1.ROLLS.TOTAL_NORMAL) {
                const time = new Date().getTime() - lastChargeNormalRollDate.getTime();
                const hour = time / (1000 * 60 * 60);
                const rollsCharged = Math.floor(hour / 4);
                if (rollsCharged > 0) {
                    const newRolls = Math.min(rolls_enum_1.ROLLS.TOTAL_NORMAL, profile.normalRolls + rollsCharged);
                    if (newRolls > profile.normalRolls) {
                        await this.authFunctions.updateRolls(profile.id, newRolls);
                        profile.normalRolls = newRolls;
                        profile.lastChargeNormalRoll = new Date();
                    }
                }
            }
            request.profile = profile;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Login expired. Please log in again.');
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Refresh' ? token : undefined;
    }
};
exports.RefreshJwtGuard = RefreshJwtGuard;
exports.RefreshJwtGuard = RefreshJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        auth_functions_service_1.AuthFunctionsService])
], RefreshJwtGuard);
//# sourceMappingURL=Refresh.guard.js.map