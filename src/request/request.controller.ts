import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { CardRequestStatus } from 'src/common/types';
import { CreateRequestDto } from './request.dto';

@Controller('request')
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
