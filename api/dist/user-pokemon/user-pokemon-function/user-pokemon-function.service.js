"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPokemonFunctionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserPokemonFunctionService = class UserPokemonFunctionService extends prisma_service_1.PrismaService {
    create(data) {
        return this.userPokemon.create({
            data: {
                name: data.name,
                shiny: data.shiny,
                pokemonId: data.pokemonId,
                profileId: data.profileId,
            },
            include: {
                Pokemon: true,
            }
        });
    }
    list(profileId, page) {
        return this.userPokemon.findMany({
            where: {
                profileId,
            },
            include: {
                Pokemon: true,
            },
            take: 10,
            skip: (page - 1) * 10,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    findById(id) {
        return this.userPokemon.findUnique({
            where: {
                id,
            },
            include: {
                Pokemon: true,
            },
        });
    }
    update(id, data) {
        return this.userPokemon.update({
            where: {
                id,
            },
            data,
        });
    }
    remove(id) {
        return this.userPokemon.delete({
            where: {
                id,
            },
        });
    }
    updatePokePoints(id, pokePoints, pokeStars, food) {
        return this.profile.update({
            data: {
                pokePoints: {
                    increment: pokePoints,
                },
                pokeStars: {
                    increment: pokeStars,
                },
                food: {
                    increment: food,
                },
            },
            where: {
                id,
            },
        });
    }
};
exports.UserPokemonFunctionService = UserPokemonFunctionService;
exports.UserPokemonFunctionService = UserPokemonFunctionService = __decorate([
    (0, common_1.Injectable)()
], UserPokemonFunctionService);
//# sourceMappingURL=user-pokemon-function.service.js.map