import { Chances } from 'src/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RollFunctionService extends PrismaService {
    skipPokemonsByCount(count: number, rarity: number): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getMax(rarity: number): import("@prisma/client").Prisma.PrismaPromise<number>;
    getProfileToRarity(id: string): import("@prisma/client").Prisma.Prisma__ProfileClient<{
        toEpic: number;
        toMithyc: number;
        toLegendary: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getPokemon(rarity: number): Promise<{
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
    }>;
    getPokemonRarity(rarity: number): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getChances(id: string): import("@prisma/client").Prisma.Prisma__ProfileClient<{
        normalChance: number;
        rareChance: number;
        superRareChance: number;
        epicChance: number;
        mithycChance: number;
        legendaryChance: number;
        shinyChance: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateChances(id: string, data: Chances, toRarity: {
        toLegendary: number;
        toMithyc: number;
        toEpic: number;
    }): import("@prisma/client").Prisma.Prisma__ProfileClient<{
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
