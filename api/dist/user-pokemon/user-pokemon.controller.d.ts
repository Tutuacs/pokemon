import { UserPokemonService } from './user-pokemon.service';
import { UpdateUserPokemonDto } from './dto/update-user-pokemon.dto';
import { ROLE } from 'src/decorators';
export declare class UserPokemonController {
    private readonly userPokemonService;
    constructor(userPokemonService: UserPokemonService);
    findAll(id: string, page: string): import("@prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
    findOne(id: string, profile: {
        id: string;
        role: ROLE;
    }): Promise<{
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
    update(id: string, updateUserPokemonDto: UpdateUserPokemonDto, profile: {
        id: string;
        role: ROLE;
    }): Promise<{
        id: string;
        name: string;
        shiny: boolean;
        food: number;
        pokemonId: number;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, profile: {
        id: string;
        role: ROLE;
    }): Promise<{
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
