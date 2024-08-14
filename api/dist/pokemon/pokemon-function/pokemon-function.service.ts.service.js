"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonFunctionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PokemonFunctionService = class PokemonFunctionService extends prisma_service_1.PrismaService {
    create(data) {
        return this.pokemon.create({
            data,
        });
    }
    async list(page) {
        const pokemons = await this.pokemon.findMany({
            skip: (page - 1) * 10,
            take: 10,
        });
        const count = await this.pokemon.count();
        return {
            pokemons,
            count,
        };
    }
    findByRarity(rarity) {
        return this.pokemon.findMany({
            where: {
                rarity,
            },
        });
    }
    findById(id) {
        return this.pokemon.findUnique({
            where: {
                id,
            },
            include: {
                Evolution: true,
            },
        });
    }
    update(id, data) {
        return this.pokemon.update({
            where: {
                id,
            },
            data,
        });
    }
    remove(id) {
        return this.pokemon.delete({
            where: {
                id,
            },
        });
    }
};
exports.PokemonFunctionService = PokemonFunctionService;
exports.PokemonFunctionService = PokemonFunctionService = __decorate([
    (0, common_1.Injectable)()
], PokemonFunctionService);
//# sourceMappingURL=pokemon-function.service.ts.service.js.map