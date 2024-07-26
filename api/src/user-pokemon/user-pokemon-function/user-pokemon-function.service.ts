import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserPokemonDto } from '../dto/create-user-pokemon.dto';
import { UpdateUserPokemonDto } from '../dto/update-user-pokemon.dto';

@Injectable()
export class UserPokemonFunctionService  extends PrismaService{

    create(data: CreateUserPokemonDto) {
        return this.userPokemon.create({
            data,
        });
    }

    list() {
        return this.userPokemon.findMany();
    }

    findById(id: string) {
        return this.userPokemon.findUnique({
            where: {
                id,
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

}
