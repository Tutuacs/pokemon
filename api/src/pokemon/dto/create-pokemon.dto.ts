import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePokemonDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    shinyImage: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    evolveFood: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    evolvePokePoints: number; 

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    evolutionId: number; 

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    rarity: number;


}
