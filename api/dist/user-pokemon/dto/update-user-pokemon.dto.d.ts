import { CreateUserPokemonDto } from './create-user-pokemon.dto';
declare const UpdateUserPokemonDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserPokemonDto>>;
export declare class UpdateUserPokemonDto extends UpdateUserPokemonDto_base {
    food: number;
}
export {};
