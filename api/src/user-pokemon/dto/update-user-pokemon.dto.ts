import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPokemonDto } from './create-user-pokemon.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserPokemonDto extends PartialType(CreateUserPokemonDto) {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  food: number;
}
