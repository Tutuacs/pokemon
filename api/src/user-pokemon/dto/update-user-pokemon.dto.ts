import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPokemonDto } from './create-user-pokemon.dto';

export class UpdateUserPokemonDto extends PartialType(CreateUserPokemonDto) {}
