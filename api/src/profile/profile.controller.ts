import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access, ProfileAuth, ROLE } from 'src/decorators';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  
  @Get('home/builder/:id')
  async homeBuilder(@Param() param: {id: string}) {
    return await this.profileService.homeBuilder(param);
  }
  
  @UseGuards(AuthGuard, RoleGuard)
  @Access(ROLE.ADMIN)
  @Get('page/:page')
  findAll(@Param('page') page: string) {
    return this.profileService.findAll(+page);
  }
  
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @ProfileAuth() profile: {id: string, role: ROLE, name: string, email: string, pokePoints: number, pokeStars: number}) {
    return this.profileService.findOne(id, profile);
  }
  
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

}
