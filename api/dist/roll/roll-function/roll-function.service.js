"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollFunctionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RollFunctionService = class RollFunctionService extends prisma_service_1.PrismaService {
    skipPokemonsByCount(count, rarity) {
        return this.pokemon.findFirst({
            where: {
                rarity,
            },
            skip: count > 0 ? count : 0,
        });
    }
    getMax(rarity) {
        return this.pokemon.count({
            where: {
                rarity,
            },
        });
    }
    getProfileToRarity(id) {
        return this.profile.findFirst({
            where: {
                id,
            },
            select: {
                toEpic: true,
                toLegendary: true,
                toMithyc: true,
            },
        });
    }
    async getPokemon(rarity) {
        const max = await this.getMax(rarity);
        const random = Math.floor(Math.random() * (max - 1));
        return this.skipPokemonsByCount(random, rarity);
    }
    getPokemonRarity(rarity) {
        return this.pokemon.findFirst({
            where: {
                rarity,
            },
        });
    }
    getChances(id) {
        return this.profile.findFirst({
            where: {
                id,
            },
            select: {
                normalChance: true,
                rareChance: true,
                superRareChance: true,
                epicChance: true,
                mithycChance: true,
                legendaryChance: true,
                shinyChance: true,
            },
        });
    }
    updateChances(id, data, toRarity) {
        return this.profile.update({
            data: {
                ...data,
                ...toRarity,
                normalRolls: {
                    decrement: 1,
                },
            },
            where: {
                id,
            },
        });
    }
};
exports.RollFunctionService = RollFunctionService;
exports.RollFunctionService = RollFunctionService = __decorate([
    (0, common_1.Injectable)()
], RollFunctionService);
//# sourceMappingURL=roll-function.service.js.map