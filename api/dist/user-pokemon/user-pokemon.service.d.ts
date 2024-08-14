import { UpdateUserPokemonDto } from './dto/update-user-pokemon.dto';
import { UserPokemonFunctionService } from './user-pokemon-function/user-pokemon-function.service';
import { ROLE } from 'src/decorators';
export declare class UserPokemonService {
    private readonly userPokemonFunction;
    constructor(userPokemonFunction: UserPokemonFunctionService);
    create(data: {
        pokemonId: number;
        profileId: string;
        name: string;
        shiny: boolean;
    }): import("@prisma/client").Prisma.Prisma__UserPokemonClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(id: string, page: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    update(id: string, data: UpdateUserPokemonDto, profile: {
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
