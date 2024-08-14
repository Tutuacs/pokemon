import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    existProfile(id: string): Promise<{
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
    }>;
    existProfileEmail(email: string): Promise<{
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
    }>;
}
