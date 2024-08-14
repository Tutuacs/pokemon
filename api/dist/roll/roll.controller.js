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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollController = void 0;
const common_1 = require("@nestjs/common");
const roll_service_1 = require("./roll.service");
const guards_1 = require("../guards");
const decorators_1 = require("../decorators");
let RollController = class RollController {
    constructor(rollService) {
        this.rollService = rollService;
    }
    rollPokemon(profileId, chances, normalRolls) {
        return this.rollService.rollPokemon(profileId, chances, normalRolls);
    }
};
exports.RollController = RollController;
__decorate([
    (0, common_1.Get)('rollPokemon'),
    __param(0, (0, decorators_1.RollAuth)('profileId')),
    __param(1, (0, decorators_1.RollAuth)('chances')),
    __param(2, (0, decorators_1.RollAuth)('normalRolls')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", void 0)
], RollController.prototype, "rollPokemon", null);
exports.RollController = RollController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard),
    (0, common_1.Controller)('roll'),
    __metadata("design:paramtypes", [roll_service_1.RollService])
], RollController);
//# sourceMappingURL=roll.controller.js.map