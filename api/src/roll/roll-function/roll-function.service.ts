import { Injectable } from '@nestjs/common';
import { Chances } from 'src/decorators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RollFunctionService extends PrismaService {
  skipPokemonsByCount(count: number, rarity: number) {
    return this.pokemon.findFirst({
      where: {
        rarity,
      },
      skip: count > 0 ? count : 0,
    });
  }

  getMax(rarity: number) {
    return this.pokemon.count({
      where: {
        rarity,
      },
    });
  }

  getProfileToRarity(id: string) {
    return this.profile.findFirst({
      where: {
        id,
      },
      select: {
        toEpic: true,
        toLegendary: true,
        toMithyc: true,
      },
    });
  }

  async getPokemon(rarity: number) {
    const max = await this.getMax(rarity);
    // random is btw 0 and maxId
    const random = Math.floor(Math.random() * (max - 1));
    return this.skipPokemonsByCount(random, rarity);
  }

  getPokemonRarity(rarity: number) {
    return this.pokemon.findFirst({
      where: {
        rarity,
      },
    });
  }

  getChances(id: string) {
    return this.profile.findFirst({
      where: {
        id,
      },
      select: {
        normalChance: true,
        rareChance: true,
        superRareChance: true,
        epicChance: true,
        mithycChance: true,
        legendaryChance: true,
        shinyChance: true,
      },
    });
  }

  updateChances(
    id: string,
    data: Chances,
    toRarity: { toLegendary: number; toMithyc: number; toEpic: number },
  ) {
    return this.profile.update({
      data: {
        ...data,
        ...toRarity,
        normalRolls: {
          decrement: 1,
        },
      },
      where: {
        id,
      },
    });
  }
}
