import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    create(createPokemonDto: CreatePokemonDto): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
    findAll(page: string): Promise<{
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
    filterByRarity(id: string): import("@prisma/client").Prisma.PrismaPromise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updatePokemonDto: UpdatePokemonDto): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
    remove(id: string): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
