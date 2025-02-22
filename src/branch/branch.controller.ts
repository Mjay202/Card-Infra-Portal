import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './branch.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('branch')
@UseGuards(JwtAuthGuard)
export class BranchController {
    constructor(
        private readonly branchService: BranchService
    ) { }
    
    @Get()
    async findAll() {
        return this.branchService.findAll()
    }

    @Post()
    async create(@Body() dto: CreateBranchDto) {
        return this.branchService.create(dto)
    }

    
}
