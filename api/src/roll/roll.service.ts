import { Injectable } from '@nestjs/common';
import { RARITY } from 'src/decorators/rarity.enum';
import { CHANCES } from 'src/decorators/chances.enum';
import { Chances } from 'src/decorators';

@Injectable()
export class RollService {

  chances = {
    normalChance: 0.6,
    rareChance: 0.4,
    superRareChance: 0.3,
    epicChance: 0.2,
    mythicChance: 0.1,
    legendaryChance: 0.05,
    shinyChance: 0.01,
  };

  rollChance(
    chances: Chances,
    rarity: RARITY = RARITY.NORMAL,
  ): { shine: boolean; rarity: RARITY } {
    const random = Math.random();
    console.log(random.toFixed(3));
    switch (rarity) {
      case RARITY.NORMAL:
        if (random <= chances.normalChance) {
          console.log('NORMAL');
          return this.rollShiny(chances, RARITY.NORMAL);
        }
        return this.rollChance(chances, RARITY.RARE);
      case RARITY.RARE:
        if (random <= chances.rareChance) {
          console.log('RARO');
          return this.rollShiny(chances, RARITY.RARE);
        }
        return this.rollChance(chances, RARITY.SUPER_RARE);
      case RARITY.SUPER_RARE:
        if (random <= chances.superRareChance) {
          console.log('SUPER_RARO');
          return this.rollShiny(chances, RARITY.SUPER_RARE);
        }
        return this.rollChance(chances, RARITY.EPIC);
      case RARITY.EPIC:
        if (random <= chances.epicChance) {
          console.log('EPICO');
          return this.rollShiny(chances, RARITY.EPIC);
        }
        return this.rollChance(chances, RARITY.MITHYC);
      case RARITY.MITHYC:
        if (random <= chances.mythicChance) {
          console.log('MITICO');
          return this.rollShiny(chances, RARITY.MITHYC);
        }
        return this.rollChance(chances, RARITY.LEGENDARY);
      case RARITY.LEGENDARY:
        if (random <= chances.legendaryChance) {
          console.log('LEGENDARIO');
          return this.rollShiny(chances, RARITY.LEGENDARY);
        }
        console.log('NADA');
        return { shine: false, rarity: RARITY.SHINY };
      default:
        return { shine: false, rarity: RARITY.SHINY };
    }
  }

  rollShiny(
    chances: Chances,
    rarity: RARITY,
  ): { shine: boolean; rarity: RARITY } {
    const random = Math.random();
    if (random < chances.shinyChance) {
      console.log('SHINY');
      chances.shinyChance = 0.01;
      return { shine: true, rarity };
    }
    return { shine: false, rarity };
  }

  increaseChances(
    chances: Chances,
    rollResult: { shine: Boolean; rarity: RARITY },
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
        chances.mythicChance = CHANCES.MITHYC;
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
      mythicChance: Math.min(1, chances.mythicChance + increaseAmount),
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
      mythicChance: parseFloat(chances.mythicChance.toFixed(3)),
      legendaryChance: parseFloat(chances.legendaryChance.toFixed(3)),
      shinyChance: parseFloat(chances.shinyChance.toFixed(3)),
    };
  }

  rollPokemon(): { shine: boolean; rarity: RARITY } {
    const roll = this.rollChance(this.chances);
    this.chances = this.increaseChances(this.chances, roll);
    console.log(this.chances);
    return roll;
  }
}
