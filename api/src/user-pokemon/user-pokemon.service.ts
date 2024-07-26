import { Injectable } from '@nestjs/common';
import { CreateUserPokemonDto } from './dto/create-user-pokemon.dto';
import { UpdateUserPokemonDto } from './dto/update-user-pokemon.dto';
import { UserPokemonFunctionService } from './user-pokemon-function/user-pokemon-function.service';

@Injectable()
export class UserPokemonService {

  constructor(private readonly userPokemonFunction: UserPokemonFunctionService) {}

  create(data: CreateUserPokemonDto) {
    return this.userPokemonFunction.create(data);
  }

  findAll() {
    return this.userPokemonFunction.list();
  }

  findOne(id: string) {
    return this.userPokemonFunction.findById(id);
  }

  update(id: string, data: UpdateUserPokemonDto) {
    return this.userPokemonFunction.update(id, data);
  }

  remove(id: string) {
    return this.userPokemonFunction.remove(id);
  }
}
