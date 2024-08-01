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
      skip: count,
    });
  }

  getMaxId(rarity: number) {
    return this.pokemon.findFirst({
      where: {
        rarity,
      },
      select: {
        id: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getPokemon(rarity: number) {
    const maxId = await this.getMaxId(rarity);
    // random is btw 0 and maxId
    const random = Math.floor(Math.random() * maxId.id);
    return this.skipPokemonsByCount(random, rarity);
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
      }
    });
  }

  updateChances(id: string, data: Chances){
    return this.profile.update({
    data: {
        ...data,
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
