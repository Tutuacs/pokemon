import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserPokemonDto } from '../dto/update-user-pokemon.dto';

@Injectable()
export class UserPokemonFunctionService extends PrismaService {
  create(data: {
    pokemonId: number;
    profileId: string;
    name: string;
    shiny: boolean;
  }) {
    return this.userPokemon.create({
      data: {
        name: data.name,
        shiny: data.shiny,
        pokemonId: data.pokemonId,
        profileId: data.profileId,
      },
    });
  }

  list(profileId: string) {
    return this.userPokemon.findMany({
      where: {
        profileId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findById(id: string) {
    return this.userPokemon.findUnique({
      where: {
        id,
      },
      include: {
        Pokemon: true,
      },
    });
  }

  update(id: string, data: UpdateUserPokemonDto) {
    return this.userPokemon.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.userPokemon.delete({
      where: {
        id,
      },
    });
  }

  updatePokePoints(id: string, pokePoints: number) {
    return this.profile.update({
      data: {
        pokePoints: {
          increment: pokePoints,
        },
      },
      where: {
        id,
      },
    });
  }
}
