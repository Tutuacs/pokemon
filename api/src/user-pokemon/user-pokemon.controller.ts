import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserPokemonService } from './user-pokemon.service';
import { UpdateUserPokemonDto } from './dto/update-user-pokemon.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ProfileAuth, ROLE } from 'src/decorators';

@UseGuards(AuthGuard, RoleGuard)
@Controller('user-pokemon')
export class UserPokemonController {
  constructor(private readonly userPokemonService: UserPokemonService) {}

  @Get()
  findAll(@ProfileAuth('id') id: string) {
    return this.userPokemonService.findAll(id);
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
