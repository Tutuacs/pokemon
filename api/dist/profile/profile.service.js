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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const decorators_1 = require("../decorators");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async homeBuilder(profile) {
        const newPokemons = await this.prisma.pokemon.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                rarity: true,
            },
            take: 10,
        });
        if (profile.role === decorators_1.ROLE.DEFAULT) {
            return {
                newUsers: [],
                rolls: [],
                newPokemons,
            };
        }
        const rolls = await this.prisma.userPokemon.findMany({
            where: {
                profileId: profile.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                shiny: true,
                createdAt: true,
                Pokemon: {
                    select: {
                        id: true,
                        name: true,
                        rarity: true,
                        createdAt: true,
                    },
                },
            },
            take: 10,
        });
        if (profile.role !== decorators_1.ROLE.ADMIN) {
            return {
                newUsers: [{ ...profile, }],
                rolls,
                newPokemons,
            };
        }
        const newUsers = await this.prisma.profile.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
        return {
            rolls,
            newPokemons,
            newUsers,
        };
    }
    async findAll(page) {
        const profiles = await this.prisma.profile.findMany({
            select: {
                _count: {
                    select: {
                        Pokemon: true,
                    },
                },
                id: true,
                email: true,
                name: true,
            },
            take: 10,
            skip: 10 * (page - 1),
        });
        const count = await this.prisma.profile.count();
        return {
            profiles,
            count,
        };
    }
    async findOne(id, profile) {
        if (profile.role === decorators_1.ROLE.USER) {
            return await this.prisma.profile.findUnique({
                where: {
                    id: profile.id,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true,
                    pokePoints: true,
                    food: true,
                    gold: true,
                    normalChance: true,
                    rareChance: true,
                    superRareChance: true,
                    epicChance: true,
                    mithycChance: true,
                    legendaryChance: true,
                    toEpic: true,
                    toMithyc: true,
                    toLegendary: true,
                    shinyChance: true,
                    pokeStars: true,
                    _count: {
                        select: {
                            Pokemon: true,
                        },
                    },
                },
            });
        }
        return await this.prisma.profile.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                pokePoints: true,
                food: true,
                gold: true,
                normalChance: true,
                rareChance: true,
                superRareChance: true,
                epicChance: true,
                mithycChance: true,
                legendaryChance: true,
                shinyChance: true,
                pokeStars: true,
                _count: {
                    select: {
                        Pokemon: true,
                    },
                },
            },
        });
    }
    update(id, data) {
        return `This action updates a #${id} profile`;
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map