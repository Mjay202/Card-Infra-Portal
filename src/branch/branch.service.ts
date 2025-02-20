import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './branch.entity';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './branch.dto';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch) private branchRepo: Repository<Branch>
    ) { }
    
    async create(dto: CreateBranchDto) {
        const newBranch = await this.branchRepo.create(dto);
        return this.branchRepo.save(newBranch);
    }

    async delete(id: string) {
        return this.branchRepo.delete({id})
    }
}
