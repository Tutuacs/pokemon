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

  findAll(id: string) {
    return this.userPokemonFunction.list(id);
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
    return this.userPokemonFunction.update(id, data);
  }
  
  async remove(id: string, profile: { id: string; role: ROLE }) {
    const pokemon = await this.findOne(id, profile);
    pokemon.Pokemon.rarity

    let pokePoints = 0;

    if (pokemon.Pokemon.rarity === RARITY.LEGENDARY ) {
      pokePoints += 100;
    } else if (pokemon.Pokemon.rarity === RARITY.MITHYC ) {
      pokePoints += 80;
    } else if (pokemon.Pokemon.rarity === RARITY.EPIC ) {
      pokePoints += 60;
    } else if (pokemon.Pokemon.rarity === RARITY.SUPER_RARE ) {
      pokePoints += 40;
    } else if (pokemon.Pokemon.rarity === RARITY.RARE ) {
      pokePoints += 20;
    } else {
      pokePoints += 10;
    }

    if (pokemon.shiny) {
      pokePoints *= 5;
    }

    await this.userPokemonFunction.updatePokePoints(profile.id, pokePoints);

    return this.userPokemonFunction.remove(id);
  }
  
}
