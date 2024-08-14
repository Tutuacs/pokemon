import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE } from 'src/decorators';
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    homeBuilder(profile: {
        role: number;
        id: string;
        createdAt: Date;
        name: string;
        email: string;
    }): Promise<{
        rolls: {
            shiny: boolean;
            id: string;
            createdAt: Date;
            Pokemon: {
                name: string;
                id: number;
                createdAt: Date;
                rarity: number;
            };
        }[];
        newPokemons: {
            name: string;
            id: number;
            createdAt: Date;
            rarity: number;
        }[];
        newUsers: {
            name: string;
            id: string;
            email: string;
            createdAt: Date;
        }[];
    }>;
    findAll(page: number): Promise<{
        profiles: {
            name: string;
            id: string;
            email: string;
            _count: {
                Pokemon: number;
            };
        }[];
        count: number;
    }>;
    findOne(id: string, profile: {
        id: string;
        role: ROLE;
        name: string;
        email: string;
        pokePoints: number;
        pokeStars: number;
    }): Promise<{
        name: string;
        food: number;
        id: string;
        email: string;
        pokePoints: number;
        pokeStars: number;
        gold: number;
        normalChance: number;
        rareChance: number;
        superRareChance: number;
        epicChance: number;
        mithycChance: number;
        legendaryChance: number;
        shinyChance: number;
        createdAt: Date;
        _count: {
            Pokemon: number;
        };
    }>;
    update(id: string, data: UpdateProfileDto): string;
}
