import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserPokemonService } from './user-pokemon.service';
import { UpdateUserPokemonDto } from './dto/update-user-pokemon.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ProfileAuth } from 'src/decorators';
import { ROLE } from 'src/enums/role.enums';

@UseGuards(AuthGuard, RoleGuard)
@Controller('user-pokemon')
export class UserPokemonController {
  constructor(private readonly userPokemonService: UserPokemonService) {}

  @Get('page/:page')
  findAll(@ProfileAuth('id') id: string, @Param('page') page: string) {
    return this.userPokemonService.findAll(id, +page);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @ProfileAuth() profile: { id: string; role: ROLE },
  ) {
    return this.userPokemonService.findOne(id, profile);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPokemonDto: UpdateUserPokemonDto,
    @ProfileAuth() profile: { id: string; role: ROLE },
  ) {
    return this.userPokemonService.update(id, updateUserPokemonDto, profile);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @ProfileAuth() profile: { id: string; role: ROLE },
  ) {
    return this.userPokemonService.remove(id, profile);
  }
}
