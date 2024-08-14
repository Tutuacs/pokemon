import { RollService } from './roll.service';
import { Chances } from 'src/decorators';
export declare class RollController {
    private readonly rollService;
    constructor(rollService: RollService);
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
