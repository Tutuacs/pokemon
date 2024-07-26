import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RollService } from './roll.service';

@Controller('roll')
export class RollController {
  constructor(private readonly rollService: RollService) {}


  @Get('rollPokemon')
  rollPokemon() {
    return this.rollService.rollPokemon();
  }

}
