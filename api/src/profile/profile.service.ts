import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE } from 'src/decorators';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async homeBuilder(profile: {
    role: number;
    id: string;
    createdAt: Date;
    name: string;
    email: string;
  }) {
    const newPokemons = await this.prisma.pokemon.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        rarity: true,
      },
      take: 10,
    });

    if (profile.role === ROLE.DEFAULT) {
      return {
        newUsers: [],
        rolls: [],
        newPokemons,
      };
    }

    const rolls = await this.prisma.userPokemon.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        shiny: true,
        createdAt: true,
        Pokemon: {
          select: {
            id: true,
            name: true,
            rarity: true,
            createdAt: true,
          },
        },
      },
      take: 10,
    });

    if (profile.role !== ROLE.ADMIN) {
      return {
        newUsers: [{ ...profile, }],
        rolls,
        newPokemons,
      };
    }

    const newUsers = await this.prisma.profile.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return {
      rolls,
      newPokemons,
      newUsers,
    };
  }

  async findAll(page: number) {
    const profiles = await this.prisma.profile.findMany({
      select: {
        _count: {
          select: {
            Pokemon: true,
          },
        },
        id: true,
        email: true,
        name: true,
      },
      take: 10,
      skip: 10 * (page - 1),
    });

    const count = await this.prisma.profile.count();

    return {
      profiles,
      count,
    };
  }

  async findOne(
    id: string,
    profile: {
      id: string;
      role: ROLE;
      name: string;
      email: string;
      pokePoints: number;
      pokeStars: number;
    },
  ) {
    if (profile.role === ROLE.USER ) {
      return await this.prisma.profile.findUnique({
        where: {
          id: profile.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          pokePoints: true,
          food: true,
          gold: true,
          normalChance: true,
          rareChance: true,
          superRareChance: true,
          epicChance: true,
          mithycChance: true,
          legendaryChance: true,
          shinyChance: true,
          pokeStars: true,
          _count: {
            select: {
              Pokemon: true,
            },
          },
        },
      });
    }

    return await this.prisma.profile.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        pokePoints: true,
        food: true,
        gold: true,
        normalChance: true,
        rareChance: true,
        superRareChance: true,
        epicChance: true,
        mithycChance: true,
        legendaryChance: true,
        shinyChance: true,
        pokeStars: true,
        _count: {
          select: {
            Pokemon: true,
          },
        },
      },
    });
  }

  update(id: string, data: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }
}
