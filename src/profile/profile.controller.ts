import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './profile.dto';

@Controller('profile')
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
