import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { RARITY } from 'src/enums/rarity.enum';
import { PokemonFunctionService } from './pokemon-function/pokemon-function.service.ts.service';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonFunction: PokemonFunctionService) {}

  create(data: CreatePokemonDto) {
    return this.pokemonFunction.create(data);
  }

  findAll(page: number) {
    return this.pokemonFunction.list(page);
  }

  filterByRarity(id: RARITY) {
    return this.pokemonFunction.findByRarity(id);
  }

  async findOne(id: number) {
    return await this.pokemonFunction.findById(id);
  }

  update(id: number, data: UpdatePokemonDto) {
    return this.pokemonFunction.update(id, data);
  }

  remove(id: number) {
    return this.pokemonFunction.remove(id);
  }
}
