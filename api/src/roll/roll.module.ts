import { Module } from '@nestjs/common';
import { RollService } from './roll.service';
import { RollController } from './roll.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserPokemonModule } from 'src/user-pokemon/user-pokemon.module';
import { RollFunctionService } from './roll-function/roll-function.service';

@Module({
  imports: [ PrismaModule, AuthModule, UserPokemonModule],
  controllers: [RollController],
  providers: [RollService, RollFunctionService],
})
export class RollModule {}
