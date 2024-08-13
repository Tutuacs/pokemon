import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserPokemonDto } from './dto/update-user-pokemon.dto';
import { UserPokemonFunctionService } from './user-pokemon-function/user-pokemon-function.service';
import { ROLE } from 'src/decorators';
import { RARITY } from 'src/decorators/rarity.enum';

@Injectable()
export class UserPokemonService {
  constructor(
    private readonly userPokemonFunction: UserPokemonFunctionService,
  ) {}

  create(data: {
    pokemonId: number;
    profileId: string;
    name: string;
    shiny: boolean;
  }) {
    return this.userPokemonFunction.create(data);
  }

  findAll(id: string, page: number) {
    return this.userPokemonFunction.list(id, page);
  }

  async findOne(id: string, profile: { id: string; role: ROLE }) {
    const pokemon = await this.userPokemonFunction.findById(id);
    if (profile.role !== ROLE.ADMIN && pokemon.profileId !== profile.id) {
      throw new NotFoundException('You do not have permission to access this resource');
    }
    return pokemon;
  }

  async update(id: string, data: UpdateUserPokemonDto, profile: { id: string; role: ROLE }) {
    await this.findOne(id, profile);
    console.log(data)
    return this.userPokemonFunction.update(id, data);
  }
  
  async remove(id: string, profile: { id: string; role: ROLE }) {
    const pokemon = await this.findOne(id, profile);
    pokemon.Pokemon.rarity

    const pokePoints = 100 * (pokemon.Pokemon.rarity + 1) * (pokemon.shiny ? 2 : 1);
    const pokeStars = pokemon.Pokemon.rarity + 1 * (pokemon.shiny ? 2 : 1);
    const food = 200 * (pokemon.Pokemon.rarity + 1) * (pokemon.shiny ? 2 : 1);
    await this.userPokemonFunction.updatePokePoints(profile.id, pokePoints, pokeStars, food);
    return this.userPokemonFunction.remove(id);
  }
  
}
