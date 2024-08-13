import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { RARITY } from 'src/decorators/rarity.enum';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';

@Injectable()
export class PokemonFunctionService extends PrismaService {
  create(data: CreatePokemonDto) {
    return this.pokemon.create({
      data,
    });
  }

  async list(page: number) {
    const pokemons = await this.pokemon.findMany({
      skip: (page - 1) * 10,
      take: 10,
    });

    const count = await this.pokemon.count();

    return {
      pokemons,
      count,
    }
  }

  findByRarity(rarity: RARITY) {
    return this.pokemon.findMany({
      where: {
        rarity,
      },
    });
  }

  findById(id: number) {
    return this.pokemon.findUnique({
      where: {
        id,
      },
      include: {
        Evolution: true,
      },
    });
  }

  update(id: number, data: UpdatePokemonDto) {
    return this.pokemon.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return this.pokemon.delete({
      where: {
        id,
      },
    });
  }
}
