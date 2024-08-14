import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserPokemonDto } from '../dto/update-user-pokemon.dto';
export declare class UserPokemonFunctionService extends PrismaService {
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
    list(profileId: string, page: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    findById(id: string): import("@prisma/client").Prisma.Prisma__UserPokemonClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, data: UpdateUserPokemonDto): import("@prisma/client").Prisma.Prisma__UserPokemonClient<{
        id: string;
        name: string;
        shiny: boolean;
        food: number;
        pokemonId: number;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__UserPokemonClient<{
        id: string;
        name: string;
        shiny: boolean;
        food: number;
        pokemonId: number;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updatePokePoints(id: string, pokePoints: number, pokeStars: number, food: number): import("@prisma/client").Prisma.Prisma__ProfileClient<{
        id: string;
        name: string | null;
        email: string | null;
        password: string | null;
        lastNormalRoll: Date | null;
        lastChargeNormalRoll: Date | null;
        role: number;
        pokePoints: number;
        pokeStars: number;
        food: number;
        gold: number;
        normalRolls: number;
        specialRolls: number;
        toEpic: number;
        toMithyc: number;
        toLegendary: number;
        normalChance: number;
        rareChance: number;
        superRareChance: number;
        epicChance: number;
        mithycChance: number;
        legendaryChance: number;
        shinyChance: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
