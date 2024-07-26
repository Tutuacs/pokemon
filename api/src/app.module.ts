import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RollModule } from './roll/roll.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { UserPokemonModule } from './user-pokemon/user-pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RollModule,
    AuthModule,
    PrismaModule,
    ProfileModule,
    PokemonModule,
    UserPokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
