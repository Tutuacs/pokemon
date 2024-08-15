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
exports.RollService = void 0;
const common_1 = require("@nestjs/common");
const rarity_enum_1 = require("../enums/rarity.enum");
const chances_enum_1 = require("../enums/chances.enum");
const user_pokemon_service_1 = require("../user-pokemon/user-pokemon.service");
const roll_function_service_1 = require("./roll-function/roll-function.service");
const toRarity_enum_1 = require("../enums/toRarity.enum");
let RollService = class RollService {
    constructor(userPokemon, rollFunction) {
        this.userPokemon = userPokemon;
        this.rollFunction = rollFunction;
    }
    rollChance(chances, rarity = rarity_enum_1.RARITY.NORMAL) {
        const random = Math.random();
        switch (rarity) {
            case rarity_enum_1.RARITY.NORMAL:
                if (random <= chances.normalChance) {
                    return this.rollShiny(chances, rarity_enum_1.RARITY.NORMAL);
                }
                return this.rollChance(chances, rarity_enum_1.RARITY.RARE);
            case rarity_enum_1.RARITY.RARE:
                if (random <= chances.rareChance) {
                    return this.rollShiny(chances, rarity_enum_1.RARITY.RARE);
                }
                return this.rollChance(chances, rarity_enum_1.RARITY.SUPER_RARE);
            case rarity_enum_1.RARITY.SUPER_RARE:
                if (random <= chances.superRareChance) {
                    return this.rollShiny(chances, rarity_enum_1.RARITY.SUPER_RARE);
                }
                return this.rollChance(chances, rarity_enum_1.RARITY.EPIC);
            case rarity_enum_1.RARITY.EPIC:
                if (random <= chances.epicChance) {
                    return this.rollShiny(chances, rarity_enum_1.RARITY.EPIC);
                }
                return this.rollChance(chances, rarity_enum_1.RARITY.MITHYC);
            case rarity_enum_1.RARITY.MITHYC:
                if (random <= chances.mithycChance) {
                    return this.rollShiny(chances, rarity_enum_1.RARITY.MITHYC);
                }
                return this.rollChance(chances, rarity_enum_1.RARITY.LEGENDARY);
            case rarity_enum_1.RARITY.LEGENDARY:
                if (random <= chances.legendaryChance) {
                    return this.rollShiny(chances, rarity_enum_1.RARITY.LEGENDARY);
                }
                return { shine: false, rarity: rarity_enum_1.RARITY.NORMAL };
            default:
                return { shine: false, rarity: rarity_enum_1.RARITY.NORMAL };
        }
    }
    rollShiny(chances, rarity) {
        const random = Math.random();
        if (random < chances.shinyChance) {
            chances.shinyChance = 0.01;
            return { shine: true, rarity };
        }
        return { shine: false, rarity };
    }
    increaseChances(chances, rollResult) {
        switch (rollResult.rarity) {
            case rarity_enum_1.RARITY.NORMAL:
                chances = this.adjustChances(chances, 0.02);
                break;
            case rarity_enum_1.RARITY.RARE:
                chances = this.adjustChances(chances, 0.03);
                chances.normalChance = chances_enum_1.CHANCES.NORMAL;
                chances.rareChance = chances_enum_1.CHANCES.RARE;
                break;
            case rarity_enum_1.RARITY.SUPER_RARE:
                chances = this.adjustChances(chances, 0.04);
                chances.normalChance = chances_enum_1.CHANCES.NORMAL;
                chances.superRareChance = chances_enum_1.CHANCES.SUPER_RARE;
                break;
            case rarity_enum_1.RARITY.EPIC:
                chances = this.adjustChances(chances, 0.05);
                chances.normalChance = chances_enum_1.CHANCES.NORMAL;
                chances.epicChance = chances_enum_1.CHANCES.EPIC;
                break;
            case rarity_enum_1.RARITY.MITHYC:
                chances = this.adjustChances(chances, 0.06);
                chances.normalChance = chances_enum_1.CHANCES.NORMAL;
                chances.mithycChance = chances_enum_1.CHANCES.MITHYC;
                break;
            case rarity_enum_1.RARITY.LEGENDARY:
                chances = this.adjustChances(chances, 0.07);
                chances.normalChance = chances_enum_1.CHANCES.NORMAL;
                chances.legendaryChance = chances_enum_1.CHANCES.LEGENDARY;
                break;
            case rarity_enum_1.RARITY.SHINY:
                chances = this.adjustChances(chances, 0.1);
                break;
        }
        return this.roundChances(chances);
    }
    adjustChances(chances, increaseAmount) {
        return {
            normalChance: Math.max(0, chances.normalChance - (increaseAmount == 0.02 ? 0.05 : 0)),
            rareChance: Math.min(1, chances.rareChance + increaseAmount),
            superRareChance: Math.min(1, chances.superRareChance + increaseAmount),
            epicChance: Math.min(1, chances.epicChance + increaseAmount),
            mithycChance: Math.min(1, chances.mithycChance + increaseAmount),
            legendaryChance: Math.min(1, chances.legendaryChance + increaseAmount),
            shinyChance: Math.min(1, chances.shinyChance + increaseAmount / 10),
        };
    }
    roundChances(chances) {
        return {
            normalChance: parseFloat(chances.normalChance.toFixed(3)),
            rareChance: parseFloat(chances.rareChance.toFixed(3)),
            superRareChance: parseFloat(chances.superRareChance.toFixed(3)),
            epicChance: parseFloat(chances.epicChance.toFixed(3)),
            mithycChance: parseFloat(chances.mithycChance.toFixed(3)),
            legendaryChance: parseFloat(chances.legendaryChance.toFixed(3)),
            shinyChance: parseFloat(chances.shinyChance.toFixed(3)),
        };
    }
    determineRarity(toRarity) {
        if (toRarity.toLegendary >= toRarity_enum_1.TO_RARITY.DEFAULT) {
            return rarity_enum_1.RARITY.LEGENDARY;
        }
        if (toRarity.toMithyc >= toRarity_enum_1.TO_RARITY.DEFAULT) {
            return rarity_enum_1.RARITY.MITHYC;
        }
        if (toRarity.toEpic >= toRarity_enum_1.TO_RARITY.DEFAULT) {
            return rarity_enum_1.RARITY.EPIC;
        }
        return null;
    }
    async rollPokemon(profileId, chances, normalRolls) {
        if (normalRolls <= 0) {
            throw new common_1.NotFoundException('No rolls left');
        }
        const toRarity = await this.rollFunction.getProfileToRarity(profileId);
        const forcedRarity = this.determineRarity(toRarity);
        let roll;
        roll = this.rollChance(chances);
        if (forcedRarity) {
            roll = this.rollShiny(chances, forcedRarity);
            if (forcedRarity === rarity_enum_1.RARITY.LEGENDARY) {
                toRarity.toLegendary = 0;
            }
            else if (forcedRarity === rarity_enum_1.RARITY.MITHYC) {
                toRarity.toMithyc = 0;
            }
            else if (forcedRarity === rarity_enum_1.RARITY.EPIC) {
                toRarity.toEpic = 0;
            }
        }
        const newChances = this.increaseChances(chances, roll);
        if (roll.rarity !== rarity_enum_1.RARITY.LEGENDARY && newChances.legendaryChance == 1) {
            toRarity.toLegendary++;
        }
        else if (roll.rarity === rarity_enum_1.RARITY.LEGENDARY && toRarity.toLegendary > 0) {
            toRarity.toLegendary = 0;
        }
        if (roll.rarity !== rarity_enum_1.RARITY.MITHYC && newChances.mithycChance == 1) {
            toRarity.toMithyc++;
        }
        else if (roll.rarity === rarity_enum_1.RARITY.MITHYC && toRarity.toMithyc > 0) {
            toRarity.toMithyc = 0;
        }
        if (roll.rarity !== rarity_enum_1.RARITY.EPIC && newChances.epicChance == 1) {
            toRarity.toEpic++;
        }
        else if (roll.rarity === rarity_enum_1.RARITY.EPIC && toRarity.toEpic > 0) {
            toRarity.toEpic = 0;
        }
        await this.rollFunction.updateChances(profileId, newChances, toRarity);
        const pokemon = await this.rollFunction.getPokemon(roll.rarity);
        return this.userPokemon.create({
            name: pokemon.name,
            pokemonId: pokemon.id,
            profileId,
            shiny: roll.shine,
        });
    }
};
exports.RollService = RollService;
exports.RollService = RollService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_pokemon_service_1.UserPokemonService,
        roll_function_service_1.RollFunctionService])
], RollService);
//# sourceMappingURL=roll.service.js.map