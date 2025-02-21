import { Body, Controller, Get, Post } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './branch.dto';

@Controller('branch')
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
