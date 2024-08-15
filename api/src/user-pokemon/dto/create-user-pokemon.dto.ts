import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserPokemonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  evolveFood: number;

  @IsOptional()
  shiny: boolean;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  pokemonId: number;

  @IsOptional()
  @IsEmpty()
  @IsString()
  profileId: string;
}
