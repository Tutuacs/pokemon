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
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const pokemon_function_service_ts_service_1 = require("./pokemon-function/pokemon-function.service.ts.service");
let PokemonService = class PokemonService {
    constructor(pokemonFunction) {
        this.pokemonFunction = pokemonFunction;
    }
    create(data) {
        return this.pokemonFunction.create(data);
    }
    findAll(page) {
        return this.pokemonFunction.list(page);
    }
    filterByRarity(id) {
        return this.pokemonFunction.findByRarity(id);
    }
    async findOne(id) {
        return await this.pokemonFunction.findById(id);
    }
    update(id, data) {
        return this.pokemonFunction.update(id, data);
    }
    remove(id) {
        return this.pokemonFunction.remove(id);
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pokemon_function_service_ts_service_1.PokemonFunctionService])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map