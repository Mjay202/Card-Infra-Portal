import { Body, Controller, Get, Post } from '@nestjs/common';
import { SchemeService } from './scheme.service';
import { CreateSchemeDto } from './scheme.dto';

@Controller('scheme')
export class SchemeController {
    constructor (
        private readonly schemeService: SchemeService
    ) { }
    
    @Get()
    async findAll() {
        return await this.schemeService.findAll()
    }

    @Post()
    async create(@Body() dto: CreateSchemeDto) {
        return await this.schemeService.create(dto);
    }
}
