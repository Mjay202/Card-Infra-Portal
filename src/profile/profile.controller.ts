import { Body, Controller, Get, Post } from '@nestjs/common';
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

    @Post()
    async create(@Body() dto: CreateProfileDto) {
        return this.profileService.create(dto)
    }
}
