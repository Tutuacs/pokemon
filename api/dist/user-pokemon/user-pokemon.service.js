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
exports.UserPokemonService = void 0;
const common_1 = require("@nestjs/common");
const user_pokemon_function_service_1 = require("./user-pokemon-function/user-pokemon-function.service");
const decorators_1 = require("../decorators");
let UserPokemonService = class UserPokemonService {
    constructor(userPokemonFunction) {
        this.userPokemonFunction = userPokemonFunction;
    }
    create(data) {
        return this.userPokemonFunction.create(data);
    }
    findAll(id, page) {
        return this.userPokemonFunction.list(id, page);
    }
    async findOne(id, profile) {
        const pokemon = await this.userPokemonFunction.findById(id);
        if (profile.role !== decorators_1.ROLE.ADMIN && pokemon.profileId !== profile.id) {
            throw new common_1.NotFoundException('You do not have permission to access this resource');
        }
        return pokemon;
    }
    async update(id, data, profile) {
        await this.findOne(id, profile);
        return this.userPokemonFunction.update(id, data);
    }
    async remove(id, profile) {
        const pokemon = await this.findOne(id, profile);
        pokemon.Pokemon.rarity;
        const pokePoints = 100 * (pokemon.Pokemon.rarity + 1) * (pokemon.shiny ? 2 : 1);
        const pokeStars = pokemon.Pokemon.rarity + 1 * (pokemon.shiny ? 2 : 1);
        const food = 200 * (pokemon.Pokemon.rarity + 1) * (pokemon.shiny ? 2 : 1);
        await this.userPokemonFunction.updatePokePoints(profile.id, pokePoints, pokeStars, food);
        return this.userPokemonFunction.remove(id);
    }
};
exports.UserPokemonService = UserPokemonService;
exports.UserPokemonService = UserPokemonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_pokemon_function_service_1.UserPokemonFunctionService])
], UserPokemonService);
//# sourceMappingURL=user-pokemon.service.js.map