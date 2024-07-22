import { Module } from '@nestjs/common';
import { BagModule } from './bag/bag.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { UserPokemonModule } from './user-pokemon/user-pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BagModule,
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
