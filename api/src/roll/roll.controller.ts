import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RollService } from './roll.service';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Chances, RollAuth } from 'src/decorators';

@UseGuards(AuthGuard)
@Controller('roll')
export class RollController {
  constructor(private readonly rollService: RollService) {}

  @Get('rollPokemon')
  rollPokemon(@RollAuth('profileId') profileId: string, @RollAuth('chances') chances: Chances, @RollAuth('normalRolls') normalRolls: number) {
    return this.rollService.rollPokemon(profileId, chances, normalRolls);
  }

}
