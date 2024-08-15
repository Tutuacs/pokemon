import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { RARITY } from 'src/enums/rarity.enum';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
export declare class PokemonFunctionService extends PrismaService {
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
    list(page: number): Promise<{
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
    findByRarity(rarity: RARITY): import("@prisma/client").Prisma.PrismaPromise<{
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
    findById(id: number): import("@prisma/client").Prisma.Prisma__PokemonClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
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
