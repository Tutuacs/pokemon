import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './Validation/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './Validation';
import { AuthFunctionsService } from './auth-functions/auth-functions.service';
import { env } from 'process';

@Injectable()
export class AuthService {
  private audience = 'profile';
  private issuer = 'auth-token';
  private refreshAudience = 'refresh';
  private refreshIssuer = 'refresh-token';
  private EXPIRE_TIME = 20 * 1000;

  constructor(
    private readonly authFunctions: AuthFunctionsService,
    private readonly jwt: JwtService,
  ) {}

  async login(login: LoginDto) {
    const user = await this.authFunctions.findLogin(login);
    return this.createTokens(user);
  }

  async register(register: RegisterDto) {
    if (register.name) {
      if (register.name.length === 0) {
        register.name = register.email.split('@')[0];
      }
    }
    register.name = register.email.split('@')[0];
    return this.authFunctions.register(register);
  }

  async createToken(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
    normalRolls: number;
    lastChargeNormalRoll: Date;
    food: number;
    gold: number;
    pokePoints: number;
    pokeStars: number;
    pokemons: number;
  }) {
    return {
      token: await this.jwt.signAsync(
        {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          normalRolls: profile.normalRolls,
          lastChargeNormalRoll: profile.lastChargeNormalRoll,
          food: profile.food,
          gold: profile.gold,
          pokePoints: profile.pokePoints,
          pokeStars: profile.pokeStars,
          pokemons: profile.pokemons,
        },
        {
          expiresIn: '7d',
          subject: profile.id,
          issuer: this.issuer,
          audience: this.audience,
          secret: env.JWT_TOKEN_SECRET,
        },
      ),
    };
  }

  async createRefreshToken(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
    normalRolls: number;
    lastChargeNormalRoll: Date;
    food: number;
    gold: number;
    pokePoints: number;
    pokeStars: number;
    pokemons: number;
  }) {
    return {
      token: await this.jwt.signAsync(
        {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          normalRolls: profile.normalRolls,
          lastChargeNormalRoll: profile.lastChargeNormalRoll,
          food: profile.food,
          gold: profile.gold,
          pokePoints: profile.pokePoints,
          pokeStars: profile.pokeStars,
          pokemons: profile.pokemons,
        },
        {
          expiresIn: '7d',
          subject: profile.id,
          issuer: this.refreshIssuer,
          audience: this.refreshAudience,
          secret: env.JWT_REFRESH_SECRET,
        },
      ),
    };
  }

  async createTokens(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
    normalRolls: number;
    lastNormalRoll: Date;
    lastChargeNormalRoll: Date;
    food: number;
    gold: number;
    pokePoints: number;
    pokeStars: number;
    pokemons: number;
  }) {
    const token = (await this.createToken(profile)).token;
    const refreshToken = (await this.createRefreshToken(profile)).token;

    const tokens = {
      profile,
      tokens: {
        profile,
        access: token,
        refresh: refreshToken,
        expiresIn: new Date().setTime(new Date().getTime() + this.EXPIRE_TIME),
      },
    };

    return tokens;
  }

  async refreshTokens(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
    normalRolls: number;
    lastNormalRoll: Date;
    lastChargeNormalRoll: Date;
    food: number;
    gold: number;
    pokePoints: number;
    pokeStars: number;
    pokemons: number;
  }) {
    const token = (await this.createToken(profile)).token;
    const refreshToken = (await this.createRefreshToken(profile)).token;
    const atualizedProfile = await this.authFunctions.profileInfo(profile.id);

    return {
      profile: atualizedProfile,
      access: token,
      refresh: refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + this.EXPIRE_TIME),
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwt.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
        secret: env.JWT_TOKEN_SECRET,
      });
      return data;
    } catch (e) {
      throw new UnauthorizedException('O token não foi identificado');
    }
  }

  async checkRefreshToken(token: string) {
    try {
      const data = this.jwt.verify(token, {
        audience: this.refreshAudience,
        issuer: this.refreshIssuer,
        secret: env.JWT_REFRESH_SECRET,
      });

      return data;
    } catch (e) {
      throw new UnauthorizedException('O token não foi identificado');
    }
  }

  validToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  validRefreshToken(token: string) {
    try {
      this.checkRefreshToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
