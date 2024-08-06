import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from '../Validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthFunctionsService extends PrismaService {
  async findLogin(login: LoginDto) {

    const profile = await this.profile.findFirst({
      where: {
        email: login.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        normalRolls: true,
        normalChance: true,
        lastNormalRoll: true,
        lastChargeNormalRoll: true,
        food: true,
        gold: true,
        pokePoints: true,
        pokeStars: true,
        _count: {
          select: {
            Pokemon: true,
          }
        },
      },
    });
    console.log(profile._count.Pokemon)
    if (profile && (await bcrypt.compare(login.password, profile.password))) {
      return {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        name: profile.name,
        normalRolls: profile.normalRolls,
        lastNormalRoll: profile.lastNormalRoll,
        lastChargeNormalRoll: profile.lastChargeNormalRoll,
        food: profile.food,
        gold: profile.gold,
        pokePoints: profile.pokePoints,
        pokeStars: profile.pokeStars,
        pokemons: profile._count.Pokemon,
      };
    } else {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }
  }

  async register(register: RegisterDto) {
    const profile = await this.existProfileEmail(register.email);
    if (profile) {
      throw new ConflictException('Email já cadastrado');
    }
    return this.profile.create({
      data: {
        email: register.email,
        name: register.name,
        password: await bcrypt.hash(register.password, 10),
        role: register.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async profileInfo(id: string) {
    const profile = await this.profile.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        normalRolls: true,
        normalChance: true,
        lastNormalRoll: true,
        lastChargeNormalRoll: true,
        superRareChance: true,
        rareChance: true,
        epicChance: true,
        mithycChance: true,
        legendaryChance: true,
        shinyChance: true,
        food: true,
        gold: true,
        pokePoints: true,
        pokeStars: true,
        _count: {
          select: {
            Pokemon: true,
          }
        },
      },
    });

    return {
      id: profile.id,
      email: profile.email,
      role: profile.role,
      name: profile.name,
      normalRolls: profile.normalRolls,
      lastChargeNormalRoll: profile.lastChargeNormalRoll,
      normalChance: profile.normalChance,
      superRareChance: profile.superRareChance,
      rareChance: profile.rareChance,
      epicChance: profile.epicChance,
      mithycChance: profile.mithycChance,
      legendaryChance: profile.legendaryChance,
      shinyChance: profile.shinyChance,
      food: profile.food,
      gold: profile.gold,
      pokePoints: profile.pokePoints,
      pokeStars: profile.pokeStars,
      pokemons: profile._count.Pokemon,
    };
  }

  updateRolls(id: string, normalRolls: number) {
    return this.profile.update({
      data: {
        normalRolls,
        lastChargeNormalRoll: new Date(),
      },
      where: {
        id,
      },
    });
  }
}
