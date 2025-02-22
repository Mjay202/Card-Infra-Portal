import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { CardRequestStatus } from 'src/common/types';
import { CreateRequestDto } from './request.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('request')
@UseGuards(JwtAuthGuard)
export class RequestController {
    constructor(
        private readonly requestService: RequestService
    ) { }
    
    @Get()
    async findAll() {
        return this.requestService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.requestService.findOne(id);
    }

    @Patch('process/:id')
    async updateStatus( @Param('id') id: string) {
        return this.requestService.process(id);
    }

    @Post()
    async create(@Body() dto: CreateRequestDto) {
        return this.requestService.create(dto);
    }
}
