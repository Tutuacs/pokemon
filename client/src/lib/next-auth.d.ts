import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    profile: {
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
    };

    tokens: {
      profile?: {
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
      };
      access: string;
      refresh: string;
      expiresIn: number;
      message?: string;
      error?: string;  
      statusCode?: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    profile: {
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
    };

    tokens: {
      access: string;
      refresh: string;
      expiresIn: number;
      message?: string;
      error?: string;  
      statusCode?: number;
    };
  }
}
