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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_functions_service_1 = require("../auth/auth-functions/auth-functions.service");
const auth_service_1 = require("../auth/auth.service");
const rolls_enum_1 = require("../enums/rolls.enum");
let AuthGuard = class AuthGuard {
    constructor(authService, authFunctions) {
        this.authService = authService;
        this.authFunctions = authFunctions;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            const token = this.extractTokenFromHeader(request);
            const data = await this.authService.checkToken(token);
            const profile = await this.authFunctions.profileInfo(data.id);
            if (profile.normalRolls < rolls_enum_1.ROLLS.TOTAL_NORMAL) {
                const lastChargeTime = new Date(profile.lastChargeNormalRoll).getTime();
                const currentTime = new Date().getTime();
                const elapsedHours = (currentTime - lastChargeTime) / (1000 * 60 * 60);
                const rollsCharged = Math.floor(elapsedHours / 4);
                if (rollsCharged > 0) {
                    const updatedRolls = Math.min(rolls_enum_1.ROLLS.TOTAL_NORMAL, profile.normalRolls + rollsCharged);
                    if (updatedRolls !== profile.normalRolls) {
                        profile.normalRolls = updatedRolls;
                        profile.lastChargeNormalRoll = new Date();
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
        }
        catch {
            console.log({
                AuthGuard: 'src/guards/AuthGuard: Token não identificado.(token não valido)',
            });
            return false;
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        auth_functions_service_1.AuthFunctionsService])
], AuthGuard);
//# sourceMappingURL=Auth.guard.js.map