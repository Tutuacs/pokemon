import { Injectable, NotFoundException } from '@nestjs/common';
import { RARITY } from 'src/enums/rarity.enum';
import { CHANCES } from 'src/enums/chances.enum';
import { Chances } from 'src/decorators';
import { UserPokemonService } from 'src/user-pokemon/user-pokemon.service';
import { RollFunctionService } from './roll-function/roll-function.service';
import { TO_RARITY } from 'src/enums/toRarity.enum';

@Injectable()
export class RollService {
  constructor(
    private readonly userPokemon: UserPokemonService,
    private readonly rollFunction: RollFunctionService,
  ) {}

  rollChance(
    chances: Chances,
    rarity: RARITY = RARITY.NORMAL,
  ): { shine: boolean; rarity: RARITY } {
    const random = Math.random();
    switch (rarity) {
      case RARITY.NORMAL:
        if (random <= chances.normalChance) {
          return this.rollShiny(chances, RARITY.NORMAL);
        }
        return this.rollChance(chances, RARITY.RARE);
      case RARITY.RARE:
        if (random <= chances.rareChance) {
          return this.rollShiny(chances, RARITY.RARE);
        }
        return this.rollChance(chances, RARITY.SUPER_RARE);
      case RARITY.SUPER_RARE:
        if (random <= chances.superRareChance) {
          return this.rollShiny(chances, RARITY.SUPER_RARE);
        }
        return this.rollChance(chances, RARITY.EPIC);
      case RARITY.EPIC:
        if (random <= chances.epicChance) {
          return this.rollShiny(chances, RARITY.EPIC);
        }
        return this.rollChance(chances, RARITY.MITHYC);
      case RARITY.MITHYC:
        if (random <= chances.mithycChance) {
          return this.rollShiny(chances, RARITY.MITHYC);
        }
        return this.rollChance(chances, RARITY.LEGENDARY);
      case RARITY.LEGENDARY:
        if (random <= chances.legendaryChance) {
          return this.rollShiny(chances, RARITY.LEGENDARY);
        }
        return { shine: false, rarity: RARITY.NORMAL };
      default:
        return { shine: false, rarity: RARITY.NORMAL };
    }
  }

  rollShiny(
    chances: Chances,
    rarity: RARITY,
  ): { shine: boolean; rarity: RARITY } {
    const random = Math.random();
    if (random < chances.shinyChance) {
      chances.shinyChance = 0.01;
      return { shine: true, rarity };
    }
    return { shine: false, rarity };
  }

  increaseChances(
    chances: Chances,
    rollResult: { shine: boolean; rarity: RARITY },
  ): Chances {
    switch (rollResult.rarity) {
      case RARITY.NORMAL:
        chances = this.adjustChances(chances, 0.02);
        break;
      case RARITY.RARE:
        chances = this.adjustChances(chances, 0.03);
        chances.normalChance = CHANCES.NORMAL;
        chances.rareChance = CHANCES.RARE;
        break;
      case RARITY.SUPER_RARE:
        chances = this.adjustChances(chances, 0.04);
        chances.normalChance = CHANCES.NORMAL;
        chances.superRareChance = CHANCES.SUPER_RARE;
        break;
      case RARITY.EPIC:
        chances = this.adjustChances(chances, 0.05);
        chances.normalChance = CHANCES.NORMAL;
        chances.epicChance = CHANCES.EPIC;
        break;
      case RARITY.MITHYC:
        chances = this.adjustChances(chances, 0.06);
        chances.normalChance = CHANCES.NORMAL;
        chances.mithycChance = CHANCES.MITHYC;
        break;
      case RARITY.LEGENDARY:
        chances = this.adjustChances(chances, 0.07);
        chances.normalChance = CHANCES.NORMAL;
        chances.legendaryChance = CHANCES.LEGENDARY;
        break;
      case RARITY.SHINY:
        chances = this.adjustChances(chances, 0.1);
        break;
    }
    return this.roundChances(chances);
  }

  // Adjusts the chances for rarities above the given rarity
  adjustChances(chances: Chances, increaseAmount: number): Chances {
    return {
      normalChance: Math.max(
        0,
        chances.normalChance - (increaseAmount == 0.02 ? 0.05 : 0),
      ),
      rareChance: Math.min(1, chances.rareChance + increaseAmount),
      superRareChance: Math.min(1, chances.superRareChance + increaseAmount),
      epicChance: Math.min(1, chances.epicChance + increaseAmount),
      mithycChance: Math.min(1, chances.mithycChance + increaseAmount),
      legendaryChance: Math.min(1, chances.legendaryChance + increaseAmount),
      shinyChance: Math.min(1, chances.shinyChance + increaseAmount / 10),
    };
  }

  // Ensures all chances are rounded to a maximum of 3 decimal places
  roundChances(chances: Chances): Chances {
    return {
      normalChance: parseFloat(chances.normalChance.toFixed(3)),
      rareChance: parseFloat(chances.rareChance.toFixed(3)),
      superRareChance: parseFloat(chances.superRareChance.toFixed(3)),
      epicChance: parseFloat(chances.epicChance.toFixed(3)),
      mithycChance: parseFloat(chances.mithycChance.toFixed(3)),
      legendaryChance: parseFloat(chances.legendaryChance.toFixed(3)),
      shinyChance: parseFloat(chances.shinyChance.toFixed(3)),
    };
  }

  // Nova função para determinar a raridade desejada
  determineRarity(toRarity: any): RARITY | null {
    if (toRarity.toLegendary >= TO_RARITY.DEFAULT) {
      return RARITY.LEGENDARY;
    }
    if (toRarity.toMithyc >= TO_RARITY.DEFAULT) {
      return RARITY.MITHYC;
    }
    if (toRarity.toEpic >= TO_RARITY.DEFAULT) {
      return RARITY.EPIC;
    }
    return null;
  }

  async rollPokemon(profileId: string, chances: Chances, normalRolls: number) {
    if (normalRolls <= 0) {
      throw new NotFoundException('No rolls left');
    }
    const toRarity = await this.rollFunction.getProfileToRarity(profileId);

    // Verifica se deve forçar uma raridade específica
    const forcedRarity = this.determineRarity(toRarity);
    let roll: { shine: boolean; rarity: RARITY };

    roll = this.rollChance(chances);
    if (forcedRarity) {
      roll = this.rollShiny(chances, forcedRarity);
      // Reseta o contador para a raridade forçada
      if (forcedRarity === RARITY.LEGENDARY) {
        toRarity.toLegendary = 0;
      } else if (forcedRarity === RARITY.MITHYC) {
        toRarity.toMithyc = 0;
      } else if (forcedRarity === RARITY.EPIC) {
        toRarity.toEpic = 0;
      }
    }

    const newChances: Chances = this.increaseChances(chances, roll);

    if (roll.rarity !== RARITY.LEGENDARY && newChances.legendaryChance == 1) {
      toRarity.toLegendary++;
    } else if (roll.rarity === RARITY.LEGENDARY && toRarity.toLegendary > 0) {
      toRarity.toLegendary = 0;
    }

    if (roll.rarity !== RARITY.MITHYC && newChances.mithycChance == 1) {
      toRarity.toMithyc++;
    } else if (roll.rarity === RARITY.MITHYC && toRarity.toMithyc > 0) {
      toRarity.toMithyc = 0;
    }

    if (roll.rarity !== RARITY.EPIC && newChances.epicChance == 1) {
      toRarity.toEpic++;
    } else if (roll.rarity === RARITY.EPIC && toRarity.toEpic > 0) {
      toRarity.toEpic = 0;
    }

    await this.rollFunction.updateChances(profileId, newChances, toRarity);
    const pokemon = await this.rollFunction.getPokemon(roll.rarity);
    return this.userPokemon.create({
      name: pokemon.name,
      pokemonId: pokemon.id,
      profileId,
      shiny: roll.shine,
    });
  }
}
