import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { RARITY } from 'src/decorators/rarity.enum';
import { PokemonFunctionService } from './pokemon-function/pokemon-function.service.ts.service';
export declare class PokemonService {
    private readonly pokemonFunction;
    constructor(pokemonFunction: PokemonFunctionService);
    create(data: CreatePokemonDto): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(page: number): Promise<{
        pokemons: {
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
        }[];
        count: number;
    }>;
    filterByRarity(id: RARITY): import("@prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    findOne(id: number): Promise<{
        Evolution: {
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
    update(id: number, data: UpdatePokemonDto): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
