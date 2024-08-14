import { LoginDto } from './Validation/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './Validation';
import { AuthFunctionsService } from './auth-functions/auth-functions.service';
export declare class AuthService {
    private readonly authFunctions;
    private readonly jwt;
    private audience;
    private issuer;
    private refreshAudience;
    private refreshIssuer;
    private EXPIRE_TIME;
    constructor(authFunctions: AuthFunctionsService, jwt: JwtService);
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
    register(register: RegisterDto): Promise<{
        name: string;
        id: string;
        email: string;
        role: number;
    }>;
    createToken(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
        normalRolls: number;
        lastChargeNormalRoll: Date;
        food: number;
        gold: number;
        pokePoints: number;
        pokeStars: number;
        pokemons: number;
    }): Promise<{
        token: string;
    }>;
    createRefreshToken(profile: {
        id: string;
        email: string;
        role: number;
        name: string;
        normalRolls: number;
        lastChargeNormalRoll: Date;
        food: number;
        gold: number;
        pokePoints: number;
        pokeStars: number;
        pokemons: number;
    }): Promise<{
        token: string;
    }>;
    createTokens(profile: {
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
    refreshTokens(profile: {
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
    checkToken(token: string): Promise<any>;
    checkRefreshToken(token: string): Promise<any>;
    validToken(token: string): boolean;
    validRefreshToken(token: string): boolean;
}
