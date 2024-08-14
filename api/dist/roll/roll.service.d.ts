import { RARITY } from 'src/decorators/rarity.enum';
import { Chances } from 'src/decorators';
import { UserPokemonService } from 'src/user-pokemon/user-pokemon.service';
import { RollFunctionService } from './roll-function/roll-function.service';
export declare class RollService {
    private readonly userPokemon;
    private readonly rollFunction;
    constructor(userPokemon: UserPokemonService, rollFunction: RollFunctionService);
    rollChance(chances: Chances, rarity?: RARITY): {
        shine: boolean;
        rarity: RARITY;
    };
    rollShiny(chances: Chances, rarity: RARITY): {
        shine: boolean;
        rarity: RARITY;
    };
    increaseChances(chances: Chances, rollResult: {
        shine: Boolean;
        rarity: RARITY;
    }): Chances;
    adjustChances(chances: Chances, increaseAmount: number): Chances;
    roundChances(chances: Chances): Chances;
    determineRarity(toRarity: any): RARITY | null;
    rollPokemon(profileId: string, chances: Chances, normalRolls: number): Promise<{
        Pokemon: {
            id: number;
            name: string;
            description: string | null;
            image: string;
            shinyImage: string | null;
            rarity: number;
            evolveFood: number;
            evolvePokePoints: number;
            evolutionId: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        shiny: boolean;
        food: number;
        pokemonId: number;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
