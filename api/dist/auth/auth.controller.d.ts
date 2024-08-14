import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './Validation';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(login: LoginDto): Promise<{
        profile: {
            id: string;
            email: string;
            role: number;
            name: string;
            normalRolls: number;
            lastNormalRoll: Date;
            lastChargeNormalRoll: Date;
            food: number;
            gold: number;
            pokePoints: number;
            pokeStars: number;
            pokemons: number;
        };
        tokens: {
            profile: {
                id: string;
                email: string;
                role: number;
                name: string;
                normalRolls: number;
                lastNormalRoll: Date;
                lastChargeNormalRoll: Date;
                food: number;
                gold: number;
                pokePoints: number;
                pokeStars: number;
                pokemons: number;
            };
            access: string;
            refresh: string;
            expiresIn: number;
        };
    }>;
    registerGym(register: RegisterDto): Promise<{
        name: string;
        id: string;
        email: string;
        role: number;
    }>;
    refreshToken(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
        normalRolls: number;
        lastNormalRoll: Date;
        lastChargeNormalRoll: Date;
        food: number;
        gold: number;
        pokePoints: number;
        pokeStars: number;
        pokemons: number;
    }): Promise<{
        profile: {
            id: string;
            email: string;
            role: number;
            name: string;
            normalRolls: number;
            lastChargeNormalRoll: Date;
            normalChance: number;
            superRareChance: number;
            rareChance: number;
            epicChance: number;
            mithycChance: number;
            legendaryChance: number;
            shinyChance: number;
            food: number;
            gold: number;
            pokePoints: number;
            pokeStars: number;
            pokemons: number;
        };
        access: string;
        refresh: string;
        expiresIn: number;
    }>;
}
