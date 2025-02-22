import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) { }
    
    @Get()
    async findAll() {
        return this.profileService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.profileService.findOne(id)
    }

    @Post()
    async create(@Body() dto: CreateProfileDto) {
        return this.profileService.create(dto)
    }
}
