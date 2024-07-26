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

  list() {
    return this.pokemon.findMany();
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
