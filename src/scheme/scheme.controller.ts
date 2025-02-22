import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SchemeService } from './scheme.service';
import { CreateSchemeDto, UpdateSchemeDto } from './scheme.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('scheme')
@UseGuards(JwtAuthGuard)
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
