import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SchemeService } from './scheme.service';
import { CreateSchemeDto, UpdateSchemeDto } from './scheme.dto';

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

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateSchemeDto) {
        return await this.schemeService.update(id, dto)
    }
}
