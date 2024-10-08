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
exports.UserPokemonController = void 0;
const common_1 = require("@nestjs/common");
const user_pokemon_service_1 = require("./user-pokemon.service");
const update_user_pokemon_dto_1 = require("./dto/update-user-pokemon.dto");
const guards_1 = require("../guards");
const decorators_1 = require("../decorators");
let UserPokemonController = class UserPokemonController {
    constructor(userPokemonService) {
        this.userPokemonService = userPokemonService;
    }
    findAll(id, page) {
        return this.userPokemonService.findAll(id, +page);
    }
    findOne(id, profile) {
        return this.userPokemonService.findOne(id, profile);
    }
    update(id, updateUserPokemonDto, profile) {
        return this.userPokemonService.update(id, updateUserPokemonDto, profile);
    }
    remove(id, profile) {
        return this.userPokemonService.remove(id, profile);
    }
};
exports.UserPokemonController = UserPokemonController;
__decorate([
    (0, common_1.Get)('page/:page'),
    __param(0, (0, decorators_1.ProfileAuth)('id')),
    __param(1, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserPokemonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserPokemonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_pokemon_dto_1.UpdateUserPokemonDto, Object]),
    __metadata("design:returntype", void 0)
], UserPokemonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.ProfileAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserPokemonController.prototype, "remove", null);
exports.UserPokemonController = UserPokemonController = __decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard, guards_1.RoleGuard),
    (0, common_1.Controller)('user-pokemon'),
    __metadata("design:paramtypes", [user_pokemon_service_1.UserPokemonService])
], UserPokemonController);
//# sourceMappingURL=user-pokemon.controller.js.map