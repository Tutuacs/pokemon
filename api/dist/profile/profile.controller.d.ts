import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ROLE } from 'src/enums/role.enums';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    homeBuilder(param: {
        id: string;
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
    findAll(page: string): Promise<{
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
        _count: {
            Pokemon: number;
        };
    }>;
    update(id: string, updateProfileDto: UpdateProfileDto): string;
}
