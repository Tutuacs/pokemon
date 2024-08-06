import { PokemonCardProps } from "@/components/PokeCard";

// rarity.enum.ts
export enum RARITY {
    NORMAL = 0,
    RARE = 1,
    SUPER_RARE = 2,
    EPIC = 3,
    MITHYC = 4,
    LEGENDARY = 5,
    SHINY = 6,
  }
  
  // Objeto de mapeamento para string de raridade
  export const RARITY_MAP: Record<RARITY, PokemonCardProps['rarity']> = {
    [RARITY.NORMAL]: "normal",
    [RARITY.RARE]: "rare",
    [RARITY.SUPER_RARE]: "super-rare",
    [RARITY.EPIC]: "epic",
    [RARITY.MITHYC]: "mythic",
    [RARITY.LEGENDARY]: "legendary",
    [RARITY.SHINY]: "shine",
  };
  