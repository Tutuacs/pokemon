import { Module } from '@nestjs/common';
import { UserPokemonService } from './user-pokemon.service';
import { UserPokemonController } from './user-pokemon.controller';
import { UserPokemonFunctionService } from './user-pokemon-function/user-pokemon-function.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UserPokemonController],
  providers: [UserPokemonService, UserPokemonFunctionService],
})
export class UserPokemonModule {}
