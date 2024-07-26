import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PokemonFunctionService } from './pokemon-function/pokemon-function.service.ts.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonFunctionService],
})
export class PokemonModule {}
